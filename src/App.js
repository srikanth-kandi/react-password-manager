import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isPasswordsEmpty: true,
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPasswords: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addPassword = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newPassword = {
      id: uuidv4(),
      initialValue: initial,
      enteredWebsite: website,
      enteredUsername: username,
      enteredPassword: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      isPasswordsEmpty: false,
    }))
  }

  listenSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({showPasswords: true})
    } else {
      this.setState({showPasswords: false})
    }
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length === 0
    this.setState({passwordsList: newList, isPasswordsEmpty: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      passwordsList,
      showPasswords,
    } = this.state
    let {isPasswordsEmpty} = this.state
    const searchedPasswordList = passwordsList.filter(eachPassword =>
      eachPassword.enteredWebsite
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    if (passwordsList.length === 0) isPasswordsEmpty = true
    else isPasswordsEmpty = false
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.addPassword}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-image"
                alt="website"
              />
              <div className="input-element-container">
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.listenWebsite}
                  value={website}
                />
              </div>
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-image"
                alt="username"
              />
              <div className="input-element-container">
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.listenUsername}
                  value={username}
                />
              </div>
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-image"
                alt="password"
              />
              <div className="input-element-container">
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.listenPassword}
                  value={password}
                />
              </div>
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{passwordsList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-input-image"
                alt="search"
              />
              <div className="search-input-element-container">
                <input
                  type="search"
                  className="search-input-element"
                  placeholder="Search"
                  onChange={this.listenSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {(isPasswordsEmpty || searchedPasswordList.length === 0) && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {!isPasswordsEmpty && (
            <ul className="result-container">
              {searchedPasswordList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.enteredWebsite}</p>
                    <p className="website">{eachValue.enteredUsername}</p>
                    {!showPasswords && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {showPasswords && (
                      <p className="website">{eachValue.enteredPassword}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deletePassword(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
