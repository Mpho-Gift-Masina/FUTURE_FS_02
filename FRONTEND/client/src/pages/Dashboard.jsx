import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
//import StatCard from "../components/StatCard";
//import LeadsTable from "../components/LeadsTable";
import LeadDetailsDrawer from "../components/LeadDetailsDrawer";
import AddLeadModal from "../components/AddLeadModal";
import Toast from "../components/Toast";
import DashboardOverview from "../components/DashboardOverview";
import LeadsPage from "../components/LeadsPage";
import NotesPage from "../components/NotesPage";
import AnalyticsPage from "../components/AnalyticsPage";
import SettingsPage from "../components/SettingsPage";
import {
  addLeadNote,
  createLead,
  deleteLead,
  fetchLeads,
  getAdminData,
  removeAuthToken,
  updateLeadStatus,
} from "../lib/api";

function Dashboard({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const admin = getAdminData();

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const mapLead = (lead) => ({
    id: lead._id,
    name: lead.name,
    email: lead.email,
    source: lead.source || "Unknown",
    status:
      lead.status === "new"
        ? "New"
        : lead.status === "contacted"
        ? "Contacted"
        : "Converted",
    note:
      lead.notes && lead.notes.length > 0
        ? lead.notes[lead.notes.length - 1].text
        : lead.message || "No notes yet",
    phone: lead.phone || "",
  });

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const data = await fetchLeads();
        setLeads(data.map(mapLead));
      } catch (err) {
        setPageError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const filtered = leads.filter((lead) => {
      const matchesFilter =
        activeFilter === "All" || lead.status === activeFilter;

      const query = searchTerm.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.source.toLowerCase().includes(query) ||
        lead.note.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aValue = (a[sortField] || "").toString().toLowerCase();
      const bValue = (b[sortField] || "").toString().toLowerCase();

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [leads, searchTerm, activeFilter, sortField, sortDirection]);

  const stats = useMemo(() => {
    return [
      {
        title: "Total Leads",
        value: filteredLeads.length,
        change: `${filteredLeads.length} shown`,
      },
      {
        title: "New",
        value: filteredLeads.filter((lead) => lead.status === "New").length,
        change: "Live",
      },
      {
        title: "Contacted",
        value: filteredLeads.filter((lead) => lead.status === "Contacted").length,
        change: "Live",
      },
      {
        title: "Converted",
        value: filteredLeads.filter((lead) => lead.status === "Converted").length,
        change: "Live",
      },
    ];
  }, [filteredLeads]);

  const handleAddLead = async (newLead) => {
    try {
      const createdLead = await createLead(newLead);
      const formattedLead = mapLead(createdLead);
      setLeads((prev) => [formattedLead, ...prev]);
      showToast("Lead created successfully.");
    } catch (error) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const handleUpdateStatus = async (leadId, nextStatus) => {
    try {
      const updated = await updateLeadStatus(leadId, nextStatus);
      const updatedLead = mapLead(updated);

      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
      );

      setSelectedLead(updatedLead);
      showToast("Lead status updated.");
    } catch (error) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const handleAddNote = async (leadId, text) => {
    try {
      const updated = await addLeadNote(leadId, text);
      const updatedLead = mapLead(updated);

      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? updatedLead : lead))
      );

      setSelectedLead(updatedLead);
      showToast("Note added successfully.");
    } catch (error) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await deleteLead(leadId);

      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
      setSelectedLead(null);
      showToast("Lead deleted successfully.");
    } catch (error) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const handleSort = (field) => {
  if (sortField === field) {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortDirection("asc");
  }
 };

  const handleLogout = () => {
    removeAuthToken();
    onLogout();
    setIsMobileSidebarOpen(false);
  };

  const renderPageContent = () => {
    if (activePage === "Dashboard") {
      return (
        <DashboardOverview
          stats={stats}
          isLoading={isLoading}
          pageError={pageError}
          filteredLeads={filteredLeads}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          setSelectedLead={setSelectedLead}
        />
      );
    }

    if (activePage === "Leads") {
      return (
        <LeadsPage
          filteredLeads={filteredLeads}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setSelectedLead={setSelectedLead}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      );
    }

    if (activePage === "Notes") {
      return <NotesPage filteredLeads={filteredLeads} />;
    }

    if (activePage === "Analytics") {
      return <AnalyticsPage leads={leads} />;
    }

    if (activePage === "Settings") {
      return <SettingsPage admin={admin} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#09090f" }}>
      <div className="flex min-h-screen">
        <Sidebar
          adminEmail={admin?.email}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
            activePage={activePage}
            onChangePage={setActivePage}
        />

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1"
        >
          <Topbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenAddLead={() => setIsAddLeadOpen(true)}
            onLogout={handleLogout}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          />

          {renderPageContent()}
        </motion.main>
      </div>

      <LeadDetailsDrawer
        selectedLead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
        onDeleteLead={handleDeleteLead}
      />

      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onAddLead={handleAddLead}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default Dashboard;