import { Avatar } from "./avatars";
import { Icon } from "./icon";
import { Row } from "./layout";

export async function TopBar() {
  return (
    <header className="min-h-16 h-16 max-h-16 border-b border-gray-300 bg-gray-200">
      <Row className="justify-end items-center px-4 py-3 h-full">
        <Avatar className="justify-center items-center bg-app-lime p-0.5 h-full">
          <Icon name="person" className="text-3xl text-white" />
        </Avatar>
      </Row>
    </header>
  );
}
