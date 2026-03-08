import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import orahLogo from "@/assets/orah-logo.png";

interface SalesAgentsBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const companySizes = ["1-10", "11-50", "51-200", "200+"];
const annualRevenues = ["Under R1M", "R1M - R5M", "R5M - R20M", "R20M+"];
const budgets = ["Under R5,000/mo", "R5,000 - R10,000/mo", "R10,000 - R25,000/mo", "R25,000+/mo"];
const services = ["AI Sales Agents", "AI Customer Support", "Lead Qualification", "Full Sales Automation", "Other"];

const SalesAgentsBookingModal = ({ isOpen, onClose }: SalesAgentsBookingModalProps) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    website: "",
    companySize: "",
    revenue: "",
    budget: "",
    service: "",
    additionalInfo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.company || !form.role || !form.website || !form.companySize || !form.budget || !form.service) return;
    setSubmitting(true);
    // TODO: persist to database
    await new Promise((r) => setTimeout(r, 800));
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ firstName: "", lastName: "", email: "", company: "", role: "", website: "", companySize: "", revenue: "", budget: "", service: "", additionalInfo: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(240,20%,6%)] border border-primary-foreground/10 rounded-2xl p-8 sm:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">We'll be in touch!</h3>
                <p className="text-primary-foreground/50 text-sm">Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <img src={orahLogo} alt="ORAH" className="w-10 h-10 mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-black text-primary-foreground">
                    Get in <span className="text-[hsl(82,85%,55%)]">Touch</span>
                  </h2>
                  <p className="text-primary-foreground/45 text-sm mt-2">Tell us where you're at…</p>
                </div>

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name*" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />
                    <Input placeholder="Last Name*" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />
                  </div>

                  {/* Email */}
                  <Input placeholder="Email*" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Company*" value={form.company} onChange={(e) => update("company", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />
                    <Input placeholder="Role*" value={form.role} onChange={(e) => update("role", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Company Website*" value={form.website} onChange={(e) => update("website", e.target.value)} className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30" />
                    <Select value={form.companySize} onValueChange={(v) => update("companySize", v)}>
                      <SelectTrigger className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground data-[placeholder]:text-primary-foreground/30">
                        <SelectValue placeholder="Company Size*" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(240,20%,10%)] border-primary-foreground/10">
                        {companySizes.map((s) => (
                          <SelectItem key={s} value={s} className="text-primary-foreground">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={form.revenue} onValueChange={(v) => update("revenue", v)}>
                      <SelectTrigger className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground data-[placeholder]:text-primary-foreground/30">
                        <SelectValue placeholder="Annual Revenue" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(240,20%,10%)] border-primary-foreground/10">
                        {annualRevenues.map((r) => (
                          <SelectItem key={r} value={r} className="text-primary-foreground">{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground data-[placeholder]:text-primary-foreground/30">
                        <SelectValue placeholder="Project Budget*" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(240,20%,10%)] border-primary-foreground/10">
                        {budgets.map((b) => (
                          <SelectItem key={b} value={b} className="text-primary-foreground">{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Services */}
                  <Select value={form.service} onValueChange={(v) => update("service", v)}>
                    <SelectTrigger className="h-12 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground data-[placeholder]:text-primary-foreground/30">
                      <SelectValue placeholder="What services are you interested in?*" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(240,20%,10%)] border-primary-foreground/10">
                      {services.map((s) => (
                        <SelectItem key={s} value={s} className="text-primary-foreground">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Additional Info */}
                  <Textarea
                    placeholder="Additional Info..."
                    value={form.additionalInfo}
                    onChange={(e) => update("additionalInfo", e.target.value)}
                    className="min-h-[90px] bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 resize-y"
                  />

                  {/* Submit */}
                  <div className="text-center pt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="px-10 py-3.5 bg-primary-foreground text-[hsl(240,25%,4%)] font-bold text-sm tracking-wider uppercase rounded-lg hover:bg-primary-foreground/90 transition-all disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "SUBMIT →"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SalesAgentsBookingModal;
