import React from "react";
import { List, Icon, Modal, Header } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";
import Search from "./Search";
import CreatePost from "../Post/CreatePost";

function SideMenu({
  user: { unreadNotification, email, unreadMessage, username },
  pc = true,
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const isActive = (route) => router.pathname === route;

  return (
    <>
      <List
        style={{ paddingTop: "2rem" }}
        size="medium"
        verticalAlign="middle"
        selection
      >
        <Search />
        <br />
          <List.Item active={isActive("/")} as="a" href="/">
            <Icon
              name="home"
              size="large"
              {...(isActive("/") && { color: "teal" })}
            />
            <List.Content>{pc && <List.Header content="Home" />}</List.Content>
          </List.Item>
        <br />

        <Modal
          open={open}
          closeIcon
          trigger={
            <List.Item>
              <Icon name="plus" size="large" />
              <List.Content>
                {pc && <List.Header content="Create" />}
              </List.Content>
            </List.Item>
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Header icon="list" content="Create POST" />
          <Modal.Content>
            <CreatePost />
          </Modal.Content>
        </Modal>
        <br />

        <List.Item active={isActive("/messages")} as="a" href="/messages">
          <Icon
            name={unreadMessage ? "hand point right" : "mail outline"}
            size="large"
            {...((isActive("/messages") && { color: "teal" }) ||
              (unreadMessage && { color: "orange" }))}
          />
          <List.Content>
            {pc && <List.Header content="Messages" />}
          </List.Content>
        </List.Item>

        <br />

          <List.Item active={isActive("/notifications")} as="a" href="/notifications">
            <Icon
              name={unreadNotification ? "hand point right" : "bell outline"}
              size="large"
              {...((isActive("/notifications") && { color: "teal" }) ||
                (unreadNotification && { color: "orange" }))}
            />
            <List.Content>
              {pc && <List.Header content="Notifications" />}
            </List.Content>
          </List.Item>
        <br />

          <List.Item active={router.query.username === username} as="a" href={`/${username}`}>
            <Icon
              name="user"
              size="large"
              {...(router.query.username === username && { color: "teal" })}
            />
            <List.Content>
              {pc && <List.Header content="Account" />}
            </List.Content>
          </List.Item>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>{pc && <List.Header content="Logout" />}</List.Content>
        </List.Item>
        <br />
      </List>
    </>
  );
}

export default SideMenu;
