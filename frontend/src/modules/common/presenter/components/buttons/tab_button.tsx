import { twJoin } from "tailwind-merge";
import { Button } from "./button";

type TabButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
  isActive?: boolean;
}>;

export function TabButton({
  children,
  onClick,
  isActive = false,
}: TabButtonProps) {
  const isChildrenAString = typeof children === "string";
  return (
    <Button
      className={twJoin(
        "py-4 px-6 rounded-t-xl min-w-48",
        isActive ? "bg-white text-gray-700" : "bg-gray-300 text-gray-400"
      )}
      onClick={onClick}
    >
      {isChildrenAString && (
        <span className="text-sm font-bold">{children}</span>
      )}
      {!isChildrenAString && children}
    </Button>
  );
}
