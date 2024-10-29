import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shopping-list')
export class ShoppingList extends LitElement {
    @property()
    items = [];

    @property()
    onclick = (ingredient: any) => {};

    static styles = css`
        * {
            box-sizing: border-box;
        }

        div {
            flex: 1;
            display: flex;
            flex-flow: column wrap;
            align-items: flex-end;
            justify-content: flex-start;
            width: 100%;
            min-width: 25rem;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
            position: sticky;
            top: 1rem;
            right: 0;
        }

        h2 {
            width: 100%;
            font-size: 1.5rem;
            line-height: 1;
            font-weight: 600;
            margin: 0;
        }

        ul {
            width: 100%;
            list-style: none;
            margin: 0;
            padding: 1rem 0;
        }

        ul li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        ul li input {
            width: 1.5rem;
            height: 1.5rem;
            margin: 0;
        }

        ul li button {
            font-size: 0.875rem;
            padding: 0.5rem 0.75rem;
            margin-left: auto;
            background-color: #dc2626;
        }

        ul li button:hover,
        ul li button:focus {
            background-color: #b91c1c;
        }

        button {
            appearance: none;
            border-radius: 0.25rem;
            background-color: #0ea5e9;
            color: #ffffff;
            border: none;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            transition: background-color 0.2s ease-in-out;
            cursor: pointer;
        }

        button:hover,
        button:focus {
            background-color: #0284c7;
        }

        @media print {
            div {
                min-width: 100%;
                box-shadow: none;
            }
            button {
                display: none;
            }
        }
    `;

    render() {
        return html`<div>
            <h2>Shopping list</h2>
            <ul>
                ${this.items && this.items.length > 0
                    ? this.items.map((item: string) => {
                          const id = item.toLowerCase().replace(' ', '-');
                          return html`<li>
                              <input type="checkbox" name="${id}" id="${id}" />
                              <label for="${id}">${item}</label>
                              <button
                                  type="button"
                                  @click="${() => this.onclick(item)}"
                              >
                                  Remove
                              </button>
                          </li>`;
                      })
                    : html`<li>Your shopping list is epmty</li>`}
            </ul>
            <button
                type="button"
                @click="${() => {
                    window.print();
                }}"
            >
                Print
            </button>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'shopping-list': ShoppingList;
    }
}
