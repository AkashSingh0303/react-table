// App.js
import React, { useState } from "react";
import { Tabs, Tab, Box, TextField, InputAdornment, Button } from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon } from "@mui/icons-material";
import KanbanBoard from "./pages/KanbanBoard";
import ActiveSprint from "./pages/ActiveSprint";
import AllSprints from "./pages/AllSprint";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box sx={{ width: "100%", bgcolor: "#f7f8fa", minHeight: "100vh", color: "black" }}>
      {/* Top Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "#ffffff",
          color: "black",
        }}
      >
        {/* Tabs on left */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              color: "black", // default tab text color
            },
            "& .Mui-selected": { color: "#0073ea !important" },
            "& .MuiTabs-indicator": { backgroundColor: "#0073ea", height: 3, borderRadius: 2 },
          }}
        >
          <Tab label="Kanban" />
          <Tab label="Active Sprint" />
          <Tab label="All Sprints" />
        </Tabs>

        {/* Search + Filter on right */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                backgroundColor: "#f1f3f6",
                color: "black", // text inside
              },
            }}
            inputProps={{ style: { color: "black" } }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon sx={{ color: "black" }} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              color: "black",
              borderColor: "#bdbdbd",
              "&:hover": { borderColor: "#0073ea", color: "#0073ea" },
            }}
          >
            Filter
          </Button>
        </Box>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3, color: "black" }}>
        {tabValue === 0 && <KanbanBoard />}
        {tabValue === 1 && <ActiveSprint searchQuery={searchQuery} />}
        {tabValue === 2 && <AllSprints searchQuery={searchQuery} />}
      </Box>
    </Box>
  );
}

export default App;
