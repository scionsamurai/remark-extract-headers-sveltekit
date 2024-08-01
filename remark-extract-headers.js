import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export function remarkExtractHeaders() {
  return (tree, file) => {
    file.data.headers = [];
    let currentHeader = null; // Keep track of the current header object
    let headerCounter = 0;

    const generateId = (text, index) => {
        let id = text.toLowerCase().replace(/s+/g, '-');
        id = id.replace(/[^a-z0-9_-]/g, '');
        id = id.replace(/^[0-9-]/, '');
        id += `-${index}`;
        if (id === '') {
            id = `header-${index}`;
        }

        return id;
    };

    const getHeaderText = (node) => {
        return toString(node);
    };

    // Function to add an ID to a node
    const addIdToNode = (node, id) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;
    };

    // Visit each heading node in the tree
    visit(tree, 'heading', (node) => {
      const headerText = getHeaderText(node);
      headerCounter++
      const headerId = generateId(headerText, headerCounter); // Generate a unique ID for the header

      // Check if the heading is an h2 or higher level
      if (node.depth <= 2) {
        currentHeader = {
          text: headerText,
          id: headerId,
          depth: node.depth,
          children: [], // Initialize an empty array for potential h3 children
        };

        file.data.headers.push(currentHeader); // Add the current header to the headers array
        addIdToNode(node, headerId); // Add the ID to the heading node
      } else if (node.depth === 3 && currentHeader) { // Check if the heading is an h3 and there is a current header
        const childText = headerText;
        const childId = generateId(childText, headerCounter); // Generate a unique ID for the h3 header

        currentHeader.children.push({
          text: childText,
          id: childId,
          depth: node.depth,
        });

        addIdToNode(node, childId); // Add the ID to the h3 node
      }
    });

    // Attach the headers to the `file` object
    if (!file.data.fm) file.data.fm = {};
    file.data.fm.headers = file.data.headers;
  };
}