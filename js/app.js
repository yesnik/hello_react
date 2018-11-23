// Example 1

function getFullName(user) {
	return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
	if (!user) {
		return <h4>Hi, stranger!</h4>
	} else {
		return <h4>Nice to meet you, {getFullName(user)}</h4>
	}
}

let user = {
	firstName: 'Nik',
	lastName: 'Funny'
};

function tick() {
	const element = (
		<div>
			<div className="greeting">
				{getGreeting(user)}
			</div>
			<div>
				Time: {new Date().toLocaleTimeString()}
			</div>
		</div>
	);

	ReactDOM.render(
	  element,
	  document.getElementById('root-1')
	);
}

setInterval(tick, 1000);

// Example 2
// Function component
function User(props) {
  return (
    <div className="user">
      <div>Last Name: {props.lastName}</div>
      <div>First Name: {props.firstName}</div>
    </div>
  );
}

// Class component
class Company extends React.Component {
  render() {
    return <div>Company: {this.props.title}</div>;
  }
}

let element = (
  <div>
    <User lastName="Ivanov" firstName="Ivan" />
    <Company title="Microsoft corp." />
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root-2')
);

// Example 3
class ClockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return <div>Current time: {this.state.date.toLocaleTimeString()}</div>
  }
}

ReactDOM.render(
  <ClockClass />,
  document.getElementById('root-3')
);

// Example 4
class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEnabled: true};

    // This binding is necessary to make `this` work in the callback
    // Otherwise you'll get an error in method `handleClick()`: 
    //   TypeError: Cannot read property 'setState' of undefined
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state, props) => ({
      isEnabled: !state.isEnabled
    }));
  }

  render() {
    return <button type="button" onClick={this.handleClick}>
              {this.state.isEnabled ? 'ON' : 'OFF'}
           </button>
  }
}

ReactDOM.render(
  <ToggleButton />,
  document.getElementById('root-4')
);

// Example 5
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: true};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    let button;

    if (this.state.isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return <div>{button}</div>;
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root-5')
);

// Example 6
function NumberList(props) {
  const listItems = props.numbers.map((num) =>
    <li key={num}>{num}</li>
  );

  return <ul>{listItems}</ul>
}

ReactDOM.render(
  <NumberList numbers = {[1, 2, 3]} />,
  document.getElementById('root-6')
);

// Example 6-2
function CompaniesPage(props) {
  const menuItems = props.companies.map((company) =>
    <li key={company.id}>{company.title}</li>
  );

  return (
    <div> 
      <ul>{menuItems}</ul>
      <hr />
      <h5>Company Info</h5>
      <ul>
        {props.companies.map((company) =>
          <li key={company.id}>
            Title: {company.title}, Foundation date: {company.founded_on}
          </li>
        )}
      </ul>
    </div>
  );
}

const companies = [
  {id: 1, title: 'Kenny Corp.', founded_on: '2010-10-10'},
  {id: 2, title: 'Helicopter', founded_on: '2011-05-01'}
];

ReactDOM.render(
  <CompaniesPage companies={companies} />,
  document.getElementById('root-6-2')
);

// Example 7
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Submit: name=' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root-7')
);

// Example 7-2
class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Submit: text=' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Your comment</label><br />
        <textarea value={this.state.value} onChange={this.handleChange}>
        </textarea>
        <br />
        <input type="submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <CommentForm />,
  document.getElementById('root-7-2')
);

// Example 7-3
class LanguageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'en'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Submit: value = ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Language to learn</label>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="ru">Russian</option>
          <option value="en">English</option>
          <option value="de">German</option>
        </select><br />
        <input type="submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <LanguageForm />,
  document.getElementById('root-7-3')
);

// Example 7-4
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      needTransfer: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Submit: clientName=' + this.state.clientName + 
      ' needTransfer=' + this.state.needTransfer);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Name
            <input type="text" name="clientName" onChange={this.handleChange} 
              value={this.state.clientName} />
          </label>
        </div>
        <label>
          <input type="checkbox" name="needTransfer" 
            checked={this.state.needTransfer}
            onChange={this.handleChange} />
          Need transfer
        </label><br />
        <input type="submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById('root-7-4')
);

// Example 8
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilResult(props) {
  let result;
  if (props.temperature < 100) {
    result = 'Not boil';
  } else {
    result = 'Boil';
  }
  return <b>{result}</b>
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value)
  }

  render() {
    return (
      <div>
        <label>Temperature in {scaleNames[this.props.scale]}</label><br />
        <input type="text" onChange={this.handleChange} value={this.props.temperature} />
      </div>
    );
  }
}

class BoilCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 'c',
      temperature: 0
    };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'c'
    });
  }

  handleFarenheitChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'f'
    })
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;

    const celsius = (scale === 'c') ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit = (scale === 'f') ? temperature : tryConvert(temperature, toFahrenheit);

    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} 
          onTemperatureChange={this.handleCelsiusChange} />
        <br />
        <TemperatureInput scale="f" temperature={fahrenheit} 
          onTemperatureChange={this.handleFarenheitChange} />
        <hr />
        <BoilResult temperature={celsius} />
      </div>
    );
  }
}

ReactDOM.render(
  <BoilCalculator />,
  document.getElementById('root-8')
);

// Example 9
function FlashMessage(props) {
  return (
    <div className={'flash-message flash-message_' + props.type}>
      {props.children}
    </div>
  );
}

ReactDOM.render(
  <div>
    <FlashMessage type="error">
      <h4>Oops! Some error occured.</h4>
    </FlashMessage>
    <FlashMessage type="success">
      <h4>Congratulations! I've completed challenge.</h4>
      <p>Now you can start with something new.</p>
    </FlashMessage>
  </div>,
  document.getElementById('root-9')
);
