import "./Button.scss";

export default function Button({ buttonText, className }) {
  return <button className={`button ${className}`}>{buttonText}</button>;
}
