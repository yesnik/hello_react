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
