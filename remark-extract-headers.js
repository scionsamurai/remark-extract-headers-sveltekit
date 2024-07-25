import { visit } from 'unist-util-visit';

export function remarkExtractHeaders() {
  return (tree, file) => {
    file.data.headers = [];
    let currentHeader = null;

    const generateId = (text) => `${text.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`;

    const addIdToNode = (node, id) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;
    };

    visit(tree, 'heading', (node) => {
      const headerText = node.children[0].value;
      const headerId = generateId(headerText);

      if (node.depth <= 2) {
        currentHeader = {
          text: headerText,
          id: headerId,
          depth: node.depth,
          children: [],
        };

        file.data.headers.push(currentHeader);
        addIdToNode(node, headerId);
      } else if (node.depth === 3 && currentHeader) { 
        const childText = headerText;
        const childId = generateId(childText);

        currentHeader.children.push({
          text: childText,
          id: childId,
          depth: node.depth,
        });

        addIdToNode(node, childId);
      }
    });

    if (!file.data.fm) file.data.fm = {};
    file.data.fm.headers = file.data.headers;
  };
}
