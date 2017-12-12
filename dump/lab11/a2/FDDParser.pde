import java.util.*; 

public class FDDParser {
  // A parser for a .fdd file
  
  private HashMap<String, Node> nodeHash = new HashMap<String,Node>();
  private List<Node> nodes = new ArrayList<Node>();
  private List<Edge> edges = new ArrayList<Edge>();
  
  // FDD Constructor
  // Args:
  //   * String filePath - the relative path to the .shf file to parse
  FDDParser(String filePath) {
    
    // Begin by loading an array of strings from the file
    String[] lines = loadStrings(filePath);    
    
    // Initialize some helpful integers using the specified counts in the .shf file
    int numberOfNodes = parseInt(lines[0]);
    int numberOfEdges = parseInt(lines[numberOfNodes + 1]);

    // Create a helper array to get info from the .shf file
    String[] nodeInfo = new String[2];
    
    // Iterate over the first set of data, the child nodes, and set the area of the child nodes (via their
    // corresponding ID) to the specified area
    for (int index = 1; index <= numberOfNodes; index++) {
      
      // Get the info from the given line (splitting the string by a space)
      nodeInfo = split(lines[index], ",");
      
      // Make sure there are not two nodes with the same id
      // assert (this.nodeHash.get(nodeInfo[0]) == null);
      
      // Make the node and put it into the hashmap of nodes
      Node node = new Node(parseFloat(nodeInfo[1]));
      this.nodeHash.put(nodeInfo[0], node);
    }
    
    // Create all the edges
    String[] edgeInfo = new String[3];
    float defaultLength;
    
    // Iterate over the second half of the input data: the parent/child relationships
    for (int index = numberOfNodes + 2; index <= numberOfNodes + numberOfEdges + 1; index++) {
      
      // Get the parent and child indexes from the data file
      edgeInfo = split(lines[index], ",");
      
      defaultLength = parseFloat(edgeInfo[2]);
      
      
      // IDEA: Add a check to make sure there aren't two edges for any two nodes
      
      // Ensure the nodes identified in the edges section are already defined
      // assert(this.nodeHash.get(edgeInfo[0]) != null);
      // assert(this.nodeHash.get(edgeInfo[1]) != null);
      
      // Ensure the length is a number greater than zero
      // assert(defaultLength > 0);
      
      // For each edge, make the edge, add the two nodes to it, and set the default length
      Edge edge = new Edge(this.nodeHash.get(edgeInfo[0]), this.nodeHash.get(edgeInfo[1]), defaultLength);
      this.edges.add(edge);
    }
    
    nodes = new ArrayList(this.nodeHash.values());
    
  }
  
  // Get the edges
  public List<Edge> getEdges() {
    return this.edges; 
  }
  
  // Get the nodes
  public List<Node> getNodes() {
    return this.nodes;
  }
  
}