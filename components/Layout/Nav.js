import { Menu, Container, Icon, Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Search from "./Search";
import { logoutUser } from "../../utils/authUser";

function Navbar({
  user: { unreadNotification, email, unreadMessage, username },
  pc = true,
}) {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu id="navsid" fluid borderless>
      <Menu.Item header>
        <h2>Social App</h2>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Search />
        </Menu.Item>
        <Link href="/">
          <Menu.Item header>
            <Icon
              name="home"
              size="large"
              {...(isActive("/") && { color: "black" })}
            />
          </Menu.Item>
        </Link>
        {/* <Menu.Item header>
            <Icon
              name="plus square outline"
              size="large"
              {...(isActive("/") && { color: "black" })}
            />
          </Menu.Item> */}
        <Link href="/messages">
          <Menu.Item header>
            <Icon
              name={
                unreadMessage ? "envelope outline" : "envelope open outline"
              }
              size="large"
              {...((isActive("/messages") && { color: "black" }) ||
                (unreadMessage && { color: "orange" }))}
            />
          </Menu.Item>
        </Link>
        <Link href="/notifications">
          <Menu.Item header>
            <Icon
              name={unreadNotification ? "bell" : "bell outline"}
              size="large"
              {...((isActive("/notifications") && { color: "black" }) ||
                (unreadNotification && { color: "orange" }))}
            />
          </Menu.Item>
        </Link>
        <Link href={`/${username}`}>
          <Menu.Item header>
            <Icon
              name="user circle outline"
              size="large"
              {...(router.query.username === username && {
                color: "black",
              })}
            />
          </Menu.Item>
        </Link>
        <Menu.Item header onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>

    // <Menu fluid borderless>
    //   <Container text>
    //     <Link href="/login">
    //       <Menu.Item header active={isActive("/login")}>
    //         <Icon size="large" name="sign in" />
    //         Login
    //       </Menu.Item>
    //     </Link>

    //     <Link href="/signup">
    //       <Menu.Item header active={isActive("/signup")}>
    //         <Icon size="large" name="signup" />
    //         Signup
    //       </Menu.Item>
    //     </Link>
    //   </Container>
    // </Menu>
  );
}

export default Navbar;
