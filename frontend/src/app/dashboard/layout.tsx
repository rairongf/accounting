import { Column, NavigationBar, Row, TopBar } from "@/modules/common";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row className="h-full w-full">
      <NavigationBar />
      <Column className="justify-start w-full h-full">
        <TopBar />
        {children}
      </Column>
    </Row>
  );
}
