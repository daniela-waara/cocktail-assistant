import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('drink-item')
export class DrinkItem extends LitElement {
    @property()
    drink = {
        strDrink: '',
        strAlcoholic: '',
        strCategory: '',
        strDrinkThumb: '',
        strImageAttribution: '',
        strGlass: '',
        strInstructions: '',
    };

    @property()
    onclick = (ingredients: any) => {};

    static styles = css`
        * {
            box-sizing: border-box;
        }

        li.drink {
            display: grid;
            grid-template-columns: 1fr 2fr;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
        }

        div.image {
            width: 100%;
            height: 100%;
        }

        div.image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        div.content {
            width: 100%;
            height: 100%;
            padding: 1.5rem;
            display: flex;
            flex-flow: column wrap;
            align-items: flex-end;
            justify-content: flex-start;
        }

        div.header {
            width: 100%;
        }

        div.header div.tags {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.25rem;
            padding-bottom: 1rem;
        }

        div.header div.tags span {
            display: inline-block;
            font-size: 0.75rem;
            line-height: 1;
            padding: 0.5rem;
            background-color: #dbeafe;
            border-radius: 0.25rem;
        }

        div.header h2 {
            font-size: 1.5rem;
            line-height: 1;
            font-weight: 600;
            margin: 0;
        }

        div.details {
            width: 100%;
            display: grid;
            grid-template-columns: 3fr 2fr;
            gap: 1rem;
            padding: 1rem 0 0.5rem 0;
        }

        div.details p {
            margin: 0;
            font-size: 1rem;
        }

        div.details ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        div.details li {
            font-size: 0.875rem;
            line-height: 1;
            padding: 0.5rem 0;
            border-top: 1px solid #f7f7f7;
        }

        div.details li:first-child {
            border-top: none;
            padding-top: 0;
        }

        div.details li h3 {
            font-size: 0.875rem;
            line-height: 1;
            font-weight: 600;
            margin: 0;
            padding: 0;
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
    `;

    render() {
        return html` <li class="drink">
            ${imageTemplate(
                this.drink.strDrinkThumb,
                this.drink.strImageAttribution
            )}
            <div class="content">
                ${headerTemplate(
                    this.drink.strDrink,
                    this.drink.strCategory,
                    this.drink.strAlcoholic,
                    this.drink.strGlass
                )}
                ${contentTemplate(
                    this.drink.strInstructions,
                    getIngredients(this.drink)
                )}
                <button
                    type="button"
                    @click="${() => this.onclick(getIngredients(this.drink))}"
                >
                    Add
                </button>
            </div>
        </li>`;
    }
}

function getIngredients(drink: object) {
    const ingredients = Object.entries(drink)
        .filter(
            ([key, value]) => key.startsWith('strIngredient') && value != null
        )
        .map((entry: Array<string>) => {
            return entry[1];
        });

    return ingredients;
}

function imageTemplate(image: string, attribute: string) {
    if (image === '') return;

    return html`<div class="image">
        <img src="${image}" alt="${attribute}" />
    </div>`;
}

function headerTemplate(
    name: string,
    category: string,
    alcoholic: string,
    glass: string
) {
    return html`
    <div class="header">
        <div class="tags">
            <span>${alcoholic}</span>
            <span>${category}</span>
            <span>${glass}</span>
        </div>
        <h2>${name}<h2>
    </div>`;
}

function contentTemplate(insctructions: string, ingredients: Array<string>) {
    return html` <div class="details">
        <p>${insctructions}</p>
        <ul>
            <li><h3>Ingredients</h3></li>
            ${ingredients.map((ingredient: string) => {
                return html`<li>${ingredient}</li>`;
            })}
        </ul>
    </div>`;
}

declare global {
    interface HTMLElementTagNameMap {
        'drink-item': DrinkItem;
    }
}
