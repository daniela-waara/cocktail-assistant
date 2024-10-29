import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const infoColor = html`
    <style>
        div {
            background-color: #f7f7f7;
        }
        p {
            color: #000000;
        }
    </style>
`;

const errorColor = html`
    <style>
        div {
            background-color: #fca5a5;
        }
        p {
            color: #dc2626;
        }
    </style>
`;

const successColor = html`
    <style>
        div {
            background-color: #dcfce7;
        }
        p {
            color: #16a34a;
        }
    </style>
`;

@customElement('toast-item')
export class ToastItem extends LitElement {
    @property()
    message = '';

    @property()
    status = 'info';

    static styles = css`
        * {
            box-sizing: border-box;
        }

        div {
            display: inline-block;
            padding: 1rem;
            border-radius: 0.25rem;
            box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12);
            position: fixed;
            bottom: 2rem;
            right: 2rem;
        }

        p {
            margin: 0;
            font-size: 0.875rem;
        }

        @media print {
            div {
                display: none;
            }
        }
    `;

    render() {
        return html`${this.status == 'success'
                ? successColor
                : this.status == 'error'
                ? errorColor
                : infoColor}
            <div><p>${this.message}</p></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        toast: ToastItem;
    }
}
