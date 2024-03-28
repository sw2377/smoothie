import Button from "../components/common/Button";

function Header() {
  return (
    <header className="fixed top-0 z-100 flex justify-between items-center w-full h-20 p-6 shadow bg-white">
      {/* Left Side */}
      <div>
        <ul className="flex">
          <li>
            <a>User List</a>
          </li>
          <li>
            <a>Project List</a>
          </li>
        </ul>
      </div>
      {/* Right Side */}
      <div>
        <Button>Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}

export default Header;
