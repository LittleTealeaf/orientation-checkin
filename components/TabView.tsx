import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

export type TabItem = {
  label: string;
  content: JSX.Element;
};

export default function TabView({ items }: { items: TabItem[] }) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={(e, i) => setCurrentTab(i)} aria-label="Sheets">
          {items.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>
      </Box>
      {items.map((tab, index) => (
        <div key={index} role="tabpanel" hidden={currentTab !== index} id={`tab-${index}`}>
          <Box sx={{ p: 3 }}>{tab.content}</Box>
        </div>
      ))}
    </>
  );
}
