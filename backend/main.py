from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

# --- Data Models (Unchanged) ---
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    width: int | None = None
    height: int | None = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# Initialize the FastAPI app
app = FastAPI()

# --- CORS Middleware (Unchanged) ---
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    raw_edges = pipeline.edges

    num_nodes = len(nodes)
    
    # --- CORRECTED EDGE COUNTING AND DAG LOGIC ---
    
    # 1. Create a set of all valid node IDs for quick, safe lookups.
    node_ids = {node.id for node in nodes}

    # 2. Create a new list of only the valid edges.
    #    An edge is valid only if its source and target nodes are both present.
    valid_edges = [
        edge for edge in raw_edges 
        if edge.source in node_ids and edge.target in node_ids
    ]
    
    # 3. Count only the valid edges. This is the key fix.
    num_edges = len(valid_edges)

    # 4. Build the adjacency list using only the valid edges.
    adj = {node_id: [] for node_id in node_ids}
    for edge in valid_edges:
        adj[edge.source].append(edge.target)

    # The rest of the DFS algorithm is unchanged and will now work safely.
    visiting = set()
    visited = set()
    is_dag = True

    def dfs(node_id):
        nonlocal is_dag
        visiting.add(node_id)
        visited.add(node_id)

        for neighbor_id in adj.get(node_id, []):
            if neighbor_id in visiting:
                is_dag = False
                return
            if neighbor_id not in visited:
                dfs(neighbor_id)
        
        visiting.remove(node_id)

    for node in nodes:
        if node.id not in visited:
            dfs(node.id)
            if not is_dag:
                break

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
