import { ClassNameValue } from "tailwind-merge";
import { Avatar, Column, Row } from "..";

export function TableAvatarTileCell({
  src,
  title,
  subtitle,
  avatarSize = "size-10",
}: {
  src: string;
  title: string;
  subtitle?: string;
  avatarSize?: ClassNameValue;
}) {
  return (
    <Row className="justify-start items-center gap-3 my-1">
      <Avatar className={`${avatarSize}`} />
      <Column className="justify-center items-start gap-1">
        <span className="text-neutral-900 text-base font-semibold">
          {title}
        </span>
        {subtitle != null && subtitle != "" && (
          <span className="text-slate-400 text-sm font-normal">{subtitle}</span>
        )}
      </Column>
    </Row>
  );
}
