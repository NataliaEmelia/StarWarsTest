import {LitElement, html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

const imageInfo = {
  beach: {domain: 'picsum.photos', id: 100},
  river: {domain: 'picsum.photos', id: 1015},
  canyon: {domain: 'picsum.photos', id: 1016},
};

fetch(
    'https://swapi.dev/api/starships/?format=json'
)
  .then((res) => res.json())
  .then((data) => setShips(data));

function setShips({ name, manufacturer, crew }) {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `
        <h1>${name}</h1>
        <h2>${manufacturer} | Crew: ${crew}</h2>
        
        `
    );
}


class MyElement extends LitElement {
  static properties = {
    imageName: {state: true},
  };

  constructor() {
    super();
    this.imageName = 'beach';
  }

  get input() {
    return this.renderRoot?.querySelector('input#name') ?? null;
  }

  render() {
    // Might be undefined if the input doesn't match one of the image keys
    const info = imageInfo[this.imageName];

    return html`
      <div>
        <input @input=${this.changeName} placeholder="Search...">
        <button @click=${this.handleClick}>Search</button>
       
      </div>
      <style> 
        div {
          background-color: white;
          margin: 60px auto;
          max-width: 850px;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }
        input {
          font-size: 22px;
          background-color: #f0f2fa;
          border: 0px;
          padding: 30px;
          border-radius: 10px;
          width: 100%;
        } 
        input::-webkit-input-placeholder {
          color: #000000;
        } 
         input::-moz-placeholder {
          color: #000000;
       }
        button {
          font-size: 22px;
          color: white;
          background-color: #000000;
          border: 0px;
          padding: 30px;
          border-radius: 10px;
        }
       
      </style>

      Type one of 'beach', 'river', or 'canyon':<br>
      <input id="name" .value=${this.imageName} @input=${this.updateImage}><hr>

      Using ifDefined (src removed when undefined):<br>
      <img src="https://${ifDefined(info?.domain)}/id/${ifDefined(
      info?.id
    )}/200/200"><hr>

      Without ifDefined (will 404 when undefined):<br>
      <img src="https://${info?.domain}/id/${info?.id}/200/200">
    `;
  }

  updateImage() {
    this.imageName = this.input.value;
  }
}
customElements.define('my-element', MyElement);
