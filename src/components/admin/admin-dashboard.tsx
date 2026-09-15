"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Download, LogOut, RefreshCw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { EnquiryTable } from "./enquiry-table";
import { EnquiryDetailDialog } from "./enquiry-detail-dialog";
import { StatCard } from "./stat-card";
import { adminFetch, clearAdminKey, downloadCsvExport } from "@/lib/admin-api";
import type {
  AdminStats,
  EnquiryRecord,
  EnquiryStatus,
  EnquiryWithActivity,
  ListEnquiriesResponse,
} from "@/types/admin";
import { STATUS_LABELS } from "@/types/admin";

const PAGE_SIZE = 25;

const dailyChartConfig = {
  count: {
    label: "Enquiries",
    color: "oklch(0.74 0.1 82)",
  },
} satisfies ChartConfig;

const eventChartConfig = {
  count: {
    label: "Enquiries",
    color: "oklch(0.74 0.1 82)",
  },
} satisfies ChartConfig;

function fillLast30Days(days: { date: string; count: number }[]) {
  const byDate = new Map(days.map((day) => [day.date, day.count]));
  const result: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    result.push({
      date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      count: byDate.get(key) ?? 0,
    });
  }

  return result;
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [items, setItems] = useState<EnquiryRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshingStats, setRefreshingStats] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<EnquiryStatus | undefined>();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<EnquiryWithActivity | null>(null);

  const loadStats = useCallback(async () => {
    setRefreshingStats(true);
    try {
      const data = await adminFetch<AdminStats>("/admin/stats");
      setStats(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load stats");
    } finally {
      setRefreshingStats(false);
    }
  }, []);

  const loadEnquiries = useCallback(
    async (opts: { search?: string; status?: EnquiryStatus; page?: number } = {}) => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        const currentStatus = opts.status ?? status;
        const currentSearch = opts.search ?? debouncedSearch;
        if (currentStatus) query.set("status", currentStatus);
        if (currentSearch) query.set("search", currentSearch);
        const currentPage = opts.page ?? page;
        query.set("limit", String(PAGE_SIZE));
        query.set("offset", String((currentPage - 1) * PAGE_SIZE));

        const data = await adminFetch<ListEnquiriesResponse>(`/enquiries?${query.toString()}`);
        setItems(data.items);
        setTotal(data.total);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not load enquiries");
      } finally {
        setLoading(false);
      }
    },
    [status, debouncedSearch, page],
  );

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const openEnquiry = async (enquiry: EnquiryRecord) => {
    try {
      const data = await adminFetch<EnquiryWithActivity>(`/enquiries/${enquiry.id}`);
      setSelected(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load enquiry");
    }
  };

  const handleUpdated = (updated: EnquiryWithActivity) => {
    setSelected(updated);
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setStats(null);
    loadStats();
  };

  const handleExport = async () => {
    try {
      await downloadCsvExport({ status, search: debouncedSearch });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    }
  };

  const handleLogout = () => {
    clearAdminKey();
    onLogout();
  };

  const dailyData = fillLast30Days(stats?.last30Days ?? []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logo-vns.png" alt="Venus Park" className="h-8 w-8 rounded" />
            <div>
              <p className="text-sm font-semibold leading-tight">Venus Park Admin</p>
              <p className="text-xs text-muted-foreground">Enquiry & booking dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/admin/calendar">Calendar</a>
            </Button>
            <Button variant="outline" size="sm" onClick={loadStats} disabled={refreshingStats}>
              <RefreshCw className={refreshingStats ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total" value={stats?.totals.total ?? "—"} />
          <StatCard
            label="New"
            value={stats?.totals.new ?? "—"}
            hint={stats ? `+${stats.week.newCount} this week` : undefined}
          />
          <StatCard label="Contacted" value={stats?.totals.contacted ?? "—"} />
          <StatCard label="Booked" value={stats?.totals.booked ?? "—"} />
          <StatCard label="Lost" value={stats?.totals.lost ?? "—"} />
          <StatCard
            label="This week"
            value={stats?.week.total ?? "—"}
            hint={stats ? `+${stats.month.total} this month` : undefined}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-display text-lg">Enquiries — last 30 days</CardTitle>
              <CardDescription>Daily enquiry submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={dailyChartConfig} className="aspect-[16/7]">
                <LineChart data={dailyData} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval="preserveStartEnd"
                  />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="count"
                    type="monotone"
                    stroke="var(--color-count)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg">By event type</CardTitle>
              <CardDescription>Distribution of incoming enquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={eventChartConfig} className="aspect-[16/10]">
                <BarChart data={stats?.byEventType ?? []} margin={{ left: -16, right: 8, top: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="eventType"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent nameKey="eventType" />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Enquiries</CardTitle>
            <CardDescription>
              Click a row to view details, add notes and update the status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnquiryTable
              items={items}
              total={total}
              loading={loading}
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={(next) => {
                setStatus(next);
                setPage(1);
              }}
              page={page}
              onPageChange={setPage}
              onOpenEnquiry={openEnquiry}
            />
          </CardContent>
        </Card>

        {stats?.upcoming && stats.upcoming.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Upcoming preferred dates</CardTitle>
              <CardDescription>Active enquiries grouped by preferred date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {stats.upcoming.map((item) => (
                  <div
                    key={item.date}
                    className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                  >
                    <span>
                      {new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-medium tabular-nums">
                      {item.count} {item.count === 1 ? "enquiry" : "enquiries"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </main>

      <EnquiryDetailDialog
        enquiry={selected}
        onClose={() => setSelected(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
