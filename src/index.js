import { html, nothing, render, directive } from "lit-html";
import {
  css,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
} from "lit-element";

export class XofTree extends LitElement {
  static properties = {
    multiselect: { type: Boolean },
    items: { attribute: false },
  };

  leaf() {
    return !(this.items && this.items.length > 0);
  }

  _loadTreeItem(event) {
    const treeitem = event.target;
    if (treeitem.childElementCount == 0) {
      render(
        html` ${treeitem.itemdata} - Manually loaded ${this.multiselect}
          <ul slot="items">
            ${this.renderItems(
              treeitem.itemchildren,
              treeitem.level + 1,
              this.multiselect
            )}
          </ul>`,
        treeitem,
        { eventContext: this }
      );
    }
  }

  _isleaf(children) {
    return !(children && children.length > 0);
  }

  renderItems(items, level, multiselect) {
    if (items) {
      return html`${items.map((item) => {
        return html` <li
          .itemchildren=${item.children}
          .level=${level}
          .itemdata=${item.itemdata}
          @click=${this._loadTreeItem}
        >
          ${this._isleaf(item.children) || !item.expanded
            ? html`${item.itemdata} - ${this.multiselect} - click to expand`
            : html`${item.itemdata} - ${item.expanded} - ${this.multiselect}
                <ul slot="items">
                  ${this.renderItems(item.children, level + 1, multiselect)}
                </ul>`}
        </li>`;
      })}`;
    } else {
      return html``;
    }
  }

  render() {
    return html`
      ${this.leaf()
        ? nothing
        : html`<ul role="tree" id="tree" aria-labelledby="tree_label">
            <slot name="items">
              ${this.renderItems(this.items, 0, this.multiselect)}
            </slot>
          </ul>`}
    `;
  }
}
customElements.define("xof-tree", XofTree);
