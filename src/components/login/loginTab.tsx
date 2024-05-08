import EmailInput from './emailInput';
import PassInput from './passInput';
import RememberMeBox from './rememberMe';
import SignInBtn from './signInButton';

export default function LoginTab() {
  return (
    <div className="login_tab">
      <div className="top_bar">
        <span>Login</span>
        <span>Create Account</span>
      </div>
      <h1 className="login_tab__title">WELCOME BACK</h1>
      <span className="login_tab__text">
        Sign into your existing account to earn rewards, check existing orders and more
      </span>
      <EmailInput />
      <PassInput />
      <RememberMeBox />
      <SignInBtn />
    </div>
  );
}
