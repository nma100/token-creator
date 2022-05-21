import UAuth from '@uauth/js';
import { ethers } from 'ethers';
import './TokenCreator.css';
import contractInfo from './TokenCreator.json';

const CLIENT_ID = '';

let uri = window.location.origin
let loggedUser;

const uauth = new UAuth({
  clientID: CLIENT_ID,
  redirectUri: uri
})

let showMessage = msg => document.getElementById('message').innerHTML = msg;

let login = async () => {
    try {
      const authorization = await uauth.loginWithPopup()

      uauth.user()
        .then(user => {
          console.log("Connected user :", user)
          loggedUser = user;
          document.getElementById("btn-login").style.display = "none";
          let userElt = document.getElementById("logged-user");
          userElt.innerHTML = '<span class="fa fa-user me-2"></span>' + user.sub;
          userElt.style.display = "block";
        })

      console.log("Autorization :", authorization)
    } catch (error) {
      console.error(error)
    }
}

let createToken = async () => {

  if (!loggedUser) {
    showMessage('User must login');
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();

  console.log("Signer's address :", signer.address);

  let name = document.getElementById("token-name").value;
  let symbol = document.getElementById("token-symbol").value;
  let supply = document.getElementById("token-supply").value;
  
  showMessage('<div class="spinner-border spinner-border-sm" role="status"></div> Transaction pending. Wait a few minutes please ...');
  
  const TokenCreator = new ethers.ContractFactory(contractInfo.abi , contractInfo.bytecode , signer );
  const tokenCreator = await TokenCreator.deploy(name, symbol, supply);
  tokenCreator.deployed().then(() => showMessage( "Success : Token deployed to " + tokenCreator.address ) );
}

function TokenCreatorApp() {
  return (
      <div className="container">
        <nav className="navbar navbar-light mb-5 shadow">
          <div className="container-fluid">
            <a id="page-title" className="navbar-brand fs-1" href="/">Token Creator</a>
            <div id="btn-login" onClick={login} style={{cursor: 'pointer'}}><img src="unstop-button.png" alt="Login button" /></div>
            <div id="logged-user" className="bg-success text-light px-3 py-2" style={{display: 'none'}}></div>
          </div>
        </nav>

        <div className="p-4 mb-5 bg-light border">
          
          <form className="m-0">
            <p className="lead">Create and deploy your own ERC-20 token.</p>
            <div className="mb-3">
              <label htmlFor="token-name" className="form-label">Token name</label>
              <input type="text" className="form-control" id="token-name" aria-describedby="nameInfo"/>
              <div id="nameInfo" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="token-symbol" className="form-label">Token symbol</label>
              <input type="text" className="form-control" id="token-symbol" />
            </div>
            <div className="mb-4">
              <label htmlFor="token-supply" className="form-label">Initial supply</label>
              <input type="text" className="form-control" id="token-supply" defaultValue="100000" />
            </div>
            <button type="button" onClick={createToken} className="btn btn-primary me-2">Create</button>
            <button type="reset" className="btn btn-secondary me-2">Reset</button>
            <span id="message"></span>
          </form>
          
        </div>
      </div>
  );
}

export default TokenCreatorApp;
