import { component, useState } from 'haunted';
import { html } from 'lit';
import './components/toast-item';
import './components/drink-item';
import './components/shopping-list';

function App() {
    const [toastStatus, setToastStatus] = useState('info');
    const [toastMessage, setToastMessage] = useState('');
    const [active, setActive] = useState(false);
    const [query, setQuery] = useState('');
    const [drinks, setDrinks] = useState([]);
    const [shoppingItems, setShoppingItems] = useState<Array<string>>([]);

    const handleSubmit = async () => {
        showToast('Searching...', 'info');

        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            hideToast();

            const json = await response.json();

            if (json.drinks && Array.isArray(json.drinks)) {
                setDrinks(json.drinks);
                showToast('Here are the results', 'success');
            } else {
                setDrinks([]);
                showToast('No results found', 'info');
            }
        } catch (error: any) {
            showToast('No results found', 'error');
            console.error(error.message);
        }
    };

    const addToShoppingList = (ingredients: Array<string>) => {
        const newShoppingList = [
            ...new Set([...shoppingItems, ...ingredients]),
        ];

        setShoppingItems(newShoppingList);
        showToast('Ingredients added to shopping list', 'success');
    };

    const removeFromShoppingList = (ingredient: string) => {
        const newShoppingList = shoppingItems.filter(
            (item) => item != ingredient
        );

        setShoppingItems(newShoppingList);
        showToast('Ingredient removed from shopping list', 'success');
    };

    const showToast = (message: string, status: string) => {
        setToastStatus(status);
        setToastMessage(message);
        setActive(true);

        setTimeout(() => {
            setActive(false);
        }, 2000);
    };

    const hideToast = () => {
        setActive(false);
    };

    return html`
        <style>
            header {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 0.5rem;
                padding-bottom: 2rem;
            }

            header input {
                flex-grow: 1;
                appearance: none;
                border-radius: 0.25rem;
                background-color: #f7f7f7;
                border: none;
                padding: 0.75rem 1rem;
                font-size: 1rem;
            }

            header button {
                flex: initial;
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

            header button:hover,
            header button:focus {
                background-color: #0284c7;
            }

            div.content {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                gap: 1rem;
            }

            ul {
                flex: 1;
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-flow: column wrap;
                align-items: stretch;
                justify-content: flex-start;
                gap: 1rem;
            }

            @media print {
                header {
                    display: none;
                }
                ul {
                    display: none;
                }
            }
        </style>
        <header>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for cocktail..."
                @change="${(e: any) => {
                    setQuery(e.currentTarget ? e.currentTarget.value : '');
                }}"
            />
            <button type="button" @click="${() => handleSubmit()}">
                Search
            </button>
        </header>
        <div class="content">
            <ul>
                ${drinks && drinks.length > 0
                    ? drinks.map(
                          (drink: Object) =>
                              html`<drink-item
                                  .drink="${drink}"
                                  .onclick="${addToShoppingList}"
                              ></drink-item>`
                      )
                    : query != ''
                    ? html`<li>
                          No cocktails was found, try searching for another word
                      </li>`
                    : null}
            </ul>
            <shopping-list
                .items="${shoppingItems}"
                .onclick="${removeFromShoppingList}"
            ></shopping-list>
        </div>
        ${active
            ? html` <toast-item
                  .message="${toastMessage}"
                  .status="${toastStatus}"
              ></toast-item>`
            : null}
    `;
}

customElements.define('cocktail-assistant', component(App));
