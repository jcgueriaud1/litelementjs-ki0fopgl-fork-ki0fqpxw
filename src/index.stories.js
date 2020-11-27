import "./index.js";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "centered",
  },
};
let multiselect = true;
const items = [
  {
    itemdata: "Branch1",
    expanded: true,
    children: [
      {
        itemdata: "Branch1.1",
        expanded: true,
        children: [
          {
            itemdata: "Leaf1.1.1",
          },
          {
            itemdata: "Leaf1.1.2",
          },
        ],
      },
      {
        itemdata: "Branch1.2",
        expanded: false,
        children: [
          {
            itemdata: "Leaf1.2.1",
          },
          {
            itemdata: "Leaf1.2.2",
          },
        ],
      },
    ],
  },
];

const toggleAction = () => {
  document.getElementById("tree").multiselect = !document.getElementById("tree")
    .multiselect;
};

export const story1 = () =>
  html` <div>
      <xof-tree
        id="tree"
        .multiselect=${multiselect}
        .items=${items}
      ></xof-tree>
    </div>
    <div>
      <button @click=${toggleAction}>multiselect</button>
    </div>`;
