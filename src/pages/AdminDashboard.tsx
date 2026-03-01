import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Search, Users, Filter } from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  whatsapp: string | null;
  business_name: string | null;
  industry: string | null;
  monthly_revenue: string | null;
  investment_ready: string | null;
  motivation: string | null;
  funnel_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  campaign_id: string | null;
  ad_id: string | null;
  is_disqualified: boolean | null;
  google_reviews_interest: boolean | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [funnelFilter, setFunnelFilter] = useState('all');
  const [utmSourceFilter, setUtmSourceFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/admin/login'); return; }

      // Check admin role
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id);
      const isAdmin = roles?.some(r => r.role === 'admin');
      if (!isAdmin) { setError('Access denied. Admin role required.'); setLoading(false); return; }

      const { data, error: fetchErr } = await supabase
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) { setError(fetchErr.message); }
      else { setLeads((data as Lead[]) || []); }
      setLoading(false);
    };
    checkAuthAndLoad();
  }, [navigate]);

  const uniqueValues = (key: keyof Lead) => {
    const vals = leads.map(l => l[key]).filter(Boolean) as string[];
    return [...new Set(vals)].sort();
  };

  const funnelSources = uniqueValues('funnel_source');
  const utmSources = uniqueValues('utm_source');
  const campaigns = uniqueValues('utm_campaign');

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (funnelFilter !== 'all' && l.funnel_source !== funnelFilter) return false;
      if (utmSourceFilter !== 'all' && l.utm_source !== utmSourceFilter) return false;
      if (campaignFilter !== 'all' && l.utm_campaign !== campaignFilter) return false;
      if (statusFilter === 'qualified' && l.is_disqualified) return false;
      if (statusFilter === 'disqualified' && !l.is_disqualified) return false;
      if (search) {
        const q = search.toLowerCase();
        return [l.full_name, l.email, l.business_name, l.whatsapp, l.industry]
          .some(v => v?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [leads, funnelFilter, utmSourceFilter, campaignFilter, statusFilter, search]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading…</div>;
  if (error) return <div className="min-h-screen bg-background flex items-center justify-center text-destructive">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          <h1 className="text-lg font-bold text-foreground">Leads Dashboard</h1>
          <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">{filtered.length} leads</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-1" /> Logout</Button>
      </header>

      {/* Filters */}
      <div className="px-4 py-4 space-y-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" /> Filters
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="relative col-span-2 md:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={funnelFilter} onValueChange={setFunnelFilter}>
            <SelectTrigger className="h-9"><SelectValue placeholder="Funnel" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Funnels</SelectItem>
              {funnelSources.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={utmSourceFilter} onValueChange={setUtmSourceFilter}>
            <SelectTrigger className="h-9"><SelectValue placeholder="UTM Source" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {utmSources.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="h-9"><SelectValue placeholder="Campaign" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="disqualified">Disqualified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left">
              <th className="px-4 py-2 font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Business</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">WhatsApp</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Industry</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Revenue</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Funnel</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">UTM Source</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Campaign</th>
              <th className="px-4 py-2 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(lead => (
              <tr key={lead.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString('en-ZA')}
                </td>
                <td className="px-4 py-2 text-foreground font-medium">{lead.full_name || '—'}</td>
                <td className="px-4 py-2 text-foreground">{lead.business_name || '—'}</td>
                <td className="px-4 py-2 text-foreground">{lead.email || '—'}</td>
                <td className="px-4 py-2 text-foreground">{lead.whatsapp || '—'}</td>
                <td className="px-4 py-2 text-foreground">{lead.industry || '—'}</td>
                <td className="px-4 py-2 text-foreground">{lead.monthly_revenue || '—'}</td>
                <td className="px-4 py-2">
                  {lead.funnel_source && (
                    <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full">{lead.funnel_source}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-foreground">{lead.utm_source || '—'}</td>
                <td className="px-4 py-2 text-foreground text-xs">{lead.utm_campaign || '—'}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${lead.is_disqualified ? 'bg-destructive/20 text-destructive' : 'bg-green-500/20 text-green-400'}`}>
                    {lead.is_disqualified ? 'DQ' : 'Qualified'}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={11} className="px-4 py-8 text-center text-muted-foreground">No leads found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
