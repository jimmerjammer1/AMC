import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Building2, Users, ExternalLink, Plus, Trash2, Edit2, Save, X, Filter } from 'lucide-react';

export default function AMCTracker() {
  const [appraisers, setAppraisers] = useState([]);
  const [amcs, setAmcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingAMC, setEditingAMC] = useState(null);
  const [editingAppraiser, setEditingAppraiser] = useState(null);
  const [expandedAppraiser, setExpandedAppraiser] = useState(null);
  const [yearFilter, setYearFilter] = useState('2026');
  const [eoFilter, setEoFilter] = useState(false);
  const [expandedAMC, setExpandedAMC] = useState(null);
  const [viewingAMCNotes, setViewingAMCNotes] = useState(null); // For notes modal
  const [newNote, setNewNote] = useState({ text: '', status: 'General' });
  const [noteFilter, setNoteFilter] = useState('All'); // Filter notes by status
  const [amcStatusFilter, setAmcStatusFilter] = useState('Active'); // Filter AMCs by status
  const [searchQuery, setSearchQuery] = useState(''); // Search AMCs by name

  // Initialize with default data on first load
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Try to load from storage
      const [appraisersRes, amcsRes] = await Promise.all([
        window.storage.get('appraisers').catch(() => null),
        window.storage.get('amcs').catch(() => null)
      ]);

      if (appraisersRes?.value && amcsRes?.value) {
        // Data exists, load it
        setAppraisers(JSON.parse(appraisersRes.value));
        
        // Ensure all AMCs have a status (default to Active for existing data)
        const loadedAMCs = JSON.parse(amcsRes.value).map(amc => ({
          ...amc,
          status: amc.status || 'Active'
        }));
        setAmcs(loadedAMCs);
      } else {
        // No data, initialize with sample data
        const defaultAppraisers = [
          { id: 'james-1', name: 'James' },
          { id: 'matt-1', name: 'Matt' },
          { id: 'john-1', name: 'John' }
        ];
        
        const defaultAMCs = [
          {id: "amc-1", name: "Appraisal Shield", website: "https://www.appraisalshield.com/login.cfm", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-2", name: "A1 AMC", website: "https://a1amc.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-3", name: "Absolute Value Management", website: "https://avm.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-4", name: "Accurate Group", website: "https://appraiser.accurategroup.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-5", name: "Accuworth", website: "https://accuworth.appraisalscope.com/login#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-6", name: "ALLSTATE", website: "https://allstate.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-7", name: "AMC Direct", website: "https://amcdirect.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-8", name: "AMC SETTLEMENT SERVICES", website: "https://amcssc.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-9", name: "AMSA ", website: "https://amsa.appraisalscope.com/signin/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-10", name: "AMROCK", website: "https://www.myappraisalconnection.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-11", name: "AnnieMac Home Mortgage", website: "https://anniemac.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-12", name: "Appraisal Linx", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=3743", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-13", name: "Appraisal Linx - New Website", website: "https://appraisallinx.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-14", name: "Appraisal Logistics / Appraisal Logistic Solutions", website: "https://portal.appraisallogistics.com/index.php?v=login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-15", name: "Appraisal Management Company, LLC", website: "https://amc.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-16", name: "Appraisal Management Solutions", website: "https://appraisalmgtsolutions.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-17", name: "Appraisal MC", website: "https://appraisalmc.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-18", name: "Appraisal Nation", website: "https://appraisalnation.appraisalscope.com/index.php/admin/appraiserdashboard#Dashboard-New", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-19", name: "Appraisal Partners", website: "https://ap.appraisalscope.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-20", name: "Appraisal Process System", website: "https://apsinc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-21", name: "AppraisalPort", website: "https://www.appraisalport.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-22", name: "Appraisals 2U, LLC", website: "https://appraisals2u.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-23", name: "Appraiser Vendor", website: "https://appraiservendor.spurams.com/login.aspx?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-24", name: "Ascent", website: "https://ascentvms.com/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-25", name: "ASI (Appraisal Services Inc) - old RPM Appraisal Services Inc.", website: "https://rpm.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-26", name: "AVS ", website: "https://www.applied-valuation.com/vendor_login.htm", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-27", name: "Better - AppraisalScope", website: "https://better.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-28", name: "Boston Private Bank", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-29", name: "Caliber Home Loans", website: "Through Appraisalport; RM emailed.", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-30", name: "Capital Bank / RIMS (Only James or Rebecca Log In)", website: "https://online.rimscentral.com/Splash.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-31", name: "CAportal - AppraisalScope", website: "https://caportal.appraisalscope.com/index.php/admin/appraiserdashboard#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-32", name: "Celebrity Home Loans", website: "Appraisal Shield website", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-33", name: "Chemical Bank", website: "Through a link they email us.", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-34", name: "Clarocity", website: "https://www.cvsorders.com/common/login.php", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-35", name: "Clear Value Consulting / Connect", website: "https://connect.clearvalueconsulting.com/Account/LogOn?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-36", name: "Clearview (New American Eagle)", website: "https://clearview.myvalutrac.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-37", name: "Community Bank / CBRES New Website", website: "https://cbres.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-38", name: "Community Bank James / CBRES (Old site)", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=3958", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-39", name: "Connect by Value Link", website: "https://app.connectvl.com/index.html#/signin", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-40", name: "Consolidated Analytics", website: "https://vendors.ca-usa.com/Account/Login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-41", name: "Core Valuation Management", website: "https://corevaluationmanagement.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-42", name: "Core Valuation Management Inc", website: "https://cvm.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-43", name: "CoreLogic Valuation Solutions", website: "https://www.vss20.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-44", name: "DART", website: "https://www.dartappraisal.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-45", name: "Data Facts", website: "https://www.appraisalfirewall.com/afdesktop/?LoginState", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-46", name: "Direct Valuation Solutions  DVS", website: "https://directvaluationsolutions.com/ValuationPlatform/?ReturnUrl=%2fValuationPlatform%2fOrderFulfillment%2fRequestDetails%2f73803", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-47", name: "EAST2WEST", website: "https://e2wappraisals.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-48", name: "Elite Valuations", website: "https://elitevaluations.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-49", name: "Encompass Appraisal Center", website: "https://appraisalcenter.elliemae.com/Login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-50", name: "Equity Solutions Nationwide Appraisal Management", website: "https://esusa.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-51", name: "Equity Solutions USA", website: "https://esusa.appraisalscope.com/index.php/admin/appraiserdashboard#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-52", name: "Exactus Appraisal Management", website: "https://exactus.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-53", name: "Exos", website: "https://ui.exostechnology.com/SpaLogin/Pub/index.exos.html#/ExosLogin?ReturnUrl=https://ui.exostechnology.com/SpaValWeb/index.exos.html#/Login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-54", name: "Fastapp", website: "https://fastapp.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-55", name: "Financial Asset Services, Inc", website: "https://workflow.fasinc.com/login.asp", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-56", name: "First American Mortgage Solutions, LLC", website: "https://amp.firstam.com/Resources/home.aspx ", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-57", name: "First Horizon", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-58", name: "First Look Appraisals", website: "https://firstlookappraisals.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-59", name: "Flagstar (through Appraisalscope)", website: "https://flagstar.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-60", name: "Frisco Lender Services", website: "https://fls.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-61", name: "Got Appraisals", website: "https://gotodin.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-62", name: "Guideline AMC", website: "https://www.guidelineamc.com/appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-63", name: "i40", website: "https://i40.appraisalscope.com/index.php/admin/appraiserdashboard#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-64", name: "Kairos Appraisal Services, LLC", website: "https://kairos.appraisalscope.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-65", name: "KARIS Management Group", website: "https://karismanagement.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-66", name: "Karis K2_appraisalscope", website: "https://karis.appraisalscope.com/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-67", name: "Lender Vend", website: "https://appraisalzone.lendervend.com ", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-68", name: "Lender X / Xome", website: "https://app.lenderx.com/ui/appraisal/request#appraisal_request_id=765856", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-69", name: "Lender\'s 1st Choice", website: "https://lenders1stchoice.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-70", name: "LRES", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-71", name: "Market Valuation Services / MVSVC", website: "https://mvsvc.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-72", name: "Market Valuation Services / MVSVC (New Site)", website: "https://mvsvc.appraisalflo.com/login/authenticate", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-73", name: "MaxVantage", website: "https://maxvantage.myvalutrac.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-74", name: "MCDONALD ORGANIZATION, INC", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=472", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-75", name: "Mercury Network", website: "https://vendors.mercuryvmp.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-76", name: "Midwest LS Appraisal", website: "https://midwest.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-77", name: "NAN Appraisals", website: "https://nan.appraisalscope.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-78", name: "Nationwide property and appraisal services", website: "https://onestopappraisals.appraisalscope.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-79", name: "Nationwide Property &Appraisal Services", website: "https://onestopappraisals.spurams.com/login.aspx?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-80", name: "NFM Lending", website: "https://nfmlending.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-81", name: "Niemiappraisal", website: "https://niemiappraisal.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-82", name: "Norman Hubbard", website: "https://apps.normanhubbard.com/Account/Login.aspx?ReturnUrl=%2fAppraiser_Portal%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-83", name: "NOVO-AMC", website: "https://www.novoamc.com/admin/login/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-84", name: "NVS / Nations Valuation Services ", website: "https://www2.nationsvs.com/Account/LogOn?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-85", name: "Olde City", website: "https://oldecity.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-86", name: "Palm Beach AMC", website: "https://palmbeachamc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-87", name: "PCV", website: "https://dashboard.pcvmurcor.com/memberpages/Main/SummaryPage.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-88", name: "Pinnacle Appraisal Management", website: "Email at: pinnacleappr@optonline.net", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-89", name: "Property Interlink", website: "https://propertyinterlink.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-90", name: "Property Sciences", website: "www.propsci.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-91", name: "Property Valuation Network", website: "https://provalnet.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-92", name: "Prosperity Mortgage ", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-93", name: "Proteck", website: "https://www.protk.com/ProTeck.LocalVendor.Web/Home/Show?pageName", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-94", name: "ProTeck VI Direct", website: "https://directvaluationsolutions.com/ValuationPlatform/Appraiser/AppraiserHome", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-95", name: "RapidAMS", website: "https://rapidams.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-96", name: "RBH Appraisal Management", website: "https://rbh.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-97", name: "Red Sky", website: "https://www.redskyriskservices.com/#home", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-98", name: "Reggora", website: "https://app.reggora.com/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-99", name: "Regions", website: "Through Appraisalport; RM emailed.", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-100", name: "RES NET", website: "https://vendor.res.net/Authentication/LogOn?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-101", name: "RRR Review", website: "https://legacy.rrreview.com/home.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-102", name: "ServiceLink ", website: "https://servicelinkfnf.cogentys.net/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-103", name: "Signature Valuation Management", website: "https://signatureamc.appraisalscope.com/admin/appraiserdashboard#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-104", name: "Solidifi", website: "https://login.solidifi.com/faces/SignIn.jsp", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-105", name: "Southeast Appraisal Management Co", website: "https://southeastamco.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-106", name: "Sunshine Appraisal Management Services", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-107", name: "SUNTENDER", website: "https://www.suntendervaluations.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-108", name: "SWBC", website: "https://swbc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-109", name: "SWBC Lending Solutions", website: "https://swbc.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-110", name: "The Appraisal Hub", website: "https://www.theappraisalhub.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-111", name: "TheAppraiserZone", website: "https://www.theappraiserzone.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-112", name: "TrUnion Appraisal Services", website: "https://trunion.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-113", name: "United States Appraisals", website: "https://appraisers.unitedstatesappraisals.com/web/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-114", name: "Universal Appraisal Network", website: "https://ucspalmbeach.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-115", name: "USamc", website: "https://usamc.spurams.com/login.aspx?ReturnUrl=%2fdefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-116", name: "USRES", website: "https://usres.appraisalscope.com/signin/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-117", name: "UVM", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-118", name: "Valuation Link Appraisal", website: "https://valuationlink.myvalutrac.com/valutrac/appraiser/profile/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-119", name: "Valuation Management Group - valuelink", website: "https://vmgappraisals.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-120", name: "Valuation Services AMC", website: "https://vsamc.appraisalscope.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-121", name: "Value Trend Solutions", website: "https://vts.myvalutrac.com/valutrac/appraiser/appraisals/default.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-122", name: "Valutrust", website: "https://valutrust.com/Account/LogOn?returnUrl=%2FPortal", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-123", name: "Vepta", website: "https://app.lenderx.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-124", name: "Veteranamc", website: "https://veteranamc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-125", name: "XOME Portal", website: "https://vendor.xomevaluations.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-126", name: "VOXTUR VALUATION", website: "https://www.voxturorders.com/common/login.php", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-129", name: "NEW SIGN UPS:", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-131", name: "AAG Appraisal Manager", website: "https://aag.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-132", name: "Accelerated AMC", website: "https://acceleratedamc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-133", name: "BNL Appraisal", website: "https://bnlappraisal.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-134", name: "Brentwood Appraisals", website: "https://brentwoodappraisals.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["john-1"], appraiserCompliance: {}},
        {id: "amc-135", name: "Flight AMC", website: "https://flightamc.appraisalscope.com/signin/?tab=sign_in", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-136", name: "GrandSouth Bank", website: "https://grandsouth.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-137", name: "Jaro Desk", website: "https://jarodesk.com/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-138", name: "K&M Appraisal", website: "https://kmamc.appraisalscope.com/signin/", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-139", name: "Mountain Seed Appraisal Management", website: "https://www.mountainseedappraisalmanagement.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-140", name: "NDA Valuations, LLC", website: "https://ndavaluations.spurams.com/login.aspx?ReturnUrl=/", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-141", name: "Prompt Property Value", website: "https://promptvalue.spurams.com/login.aspx?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-142", name: "The Jordan Real Estate Group", website: "https://jordangroup.appraisalscope.com/signin/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-143", name: "CoreLogic", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-144", name: "Collateral Management", website: "https://collateralmanagement.spurams.com/login.aspx?ReturnUrl=%2fdefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-145", name: "American Financing", website: "https://americanfinancing.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-146", name: "Financial Asset Services, Inc", website: "https://fasinc.spurams.com/login.aspx?ReturnUrl=%2fDefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1"], appraiserCompliance: {}},
        {id: "amc-147", name: "AMSA", website: "https://amsa.appraisalscope.com/signin/", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-148", name: "Amerigrid", website: "https://amergrid.spurams.com/login.aspx?ReturnUrl=/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-149", name: "AmeriMac", website: "https://www.amerimacmanagement.com/login/", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1"], appraiserCompliance: {}},
        {id: "amc-150", name: "Appraisal Links", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-151", name: "Appraisal Management Specialists", website: "https://ams.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-152", name: "Ascend Appraisal Solutions Group", website: "https://ascendasg.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-153", name: "Axis", website: "https://www.axis-amc.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-154", name: "Class Valuation", website: "https://class.appraisalscope.com/signin/?tab=sign_in", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-155", name: "Homebase", website: "https://www.homebaseamc.com/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-156", name: "iAppraisal", website: "https://iappraisal.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-157", name: "Market Valuation Services, LLC", website: "https://mvsvc.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-158", name: "Nadlan Valuation", website: "https://nadlanvaluation.spurams.com/login.aspx?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-159", name: "Oklahoma Appraisal Management Inc", website: "https://oamco.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-160", name: "Valuation Partners", website: "https://www.valuationpartners.com/vendors/appraiser_login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-161", name: "Bremer Bank", website: "https://bremer.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1"], appraiserCompliance: {}},
        {id: "amc-162", name: "Caliber AMC", website: "https://caliber.appraisalscope.com/signin/?tab=sign_in", email: "", phone: "", baseCost: "", approvedAppraisers: ["james-1", "matt-1", "john-1"], appraiserCompliance: {}},
        {id: "amc-163", name: "New American Funding", website: "https://newamericanfunding.spurams.com/login.aspx?ReturnUrl=%2fDefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: ["matt-1"], appraiserCompliance: {}},
        {id: "amc-164", name: "TO DELETE:", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-165", name: "Broad Street Valuations", website: "https://www.broadstreetvaluations.com/champ/index.php", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-166", name: "BUILDING-COST.NET", website: "https://login.craftsman-book.com/Account/Login?returnUrl=https%3a%2f%2fnae-pro.craftsman-book.com%2fAccount%2fValuations", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-167", name: "Closing Stream", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-168", name: "CMR Appraisals", website: "https://cmrappraisals.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-169", name: "Comergence - James", website: "https://appraiser.comergence.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-170", name: "Commonwealth Mortgage", website: "https://commonwealthmortgage.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-171", name: "Computer Share", website: "https://vendors-cms.clearvalueconsulting.com/Account/Login?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-172", name: "CoreLogic", website: "", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-173", name: "DIME BANK", website: "https://login-us.mimecast.com/m/secure/app/?tkn=X7es3LYKoAWxdXtNuN3Ex0fWgm_rWwkyRe5QE6gpJvmE2gSs-EmDXsbtXXSrwkG-fMQxnUGvUbNC2QOxhqLq1-byQqjIHSF9fFqPip9OA1RN_mpDDIUuORUpNEsBictPFxdyBkBV-SOsJX8LsFB2kJgy-AtHIt0UpS2kECO8sIQ#/inbox", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-174", name: "Dwellworks", website: "https://dwellworksuniversity.litmos.com/home/Dashboard", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-175", name: "Equity Valuation Partners/Third Federal", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=3820", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-176", name: "Equity Solutions", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=5164", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-177", name: "Exatect", website: "https://register.exatechpgh.com/Registration", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-178", name: "FHA Connection", website: "https://entp.hud.gov/clas.", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-179", name: "FieldPro (FOR RELS)", website: "https://fp.vpsuite.com/Dashboard?Length=9", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-180", name: "First National Bank", website: "https://fnbstaunton.myvalutrac.com/auth/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-181", name: "Frontier Mortgage (Float Loan)", website: "https://float.frontierstl.com/tracker/storemanager.php?view=Appraisalorders&wndTitle=OnlineProcessing", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-182", name: "Global Appraisal Solutions", website: "https://globalappraisalsolutions.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-183", name: "Home VMS", website: "https://www.homevms.com/Pages/clientLogin.php", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-184", name: "Independent Settlement Services", website: "https://vibe.isspgh.net/VendorPortalProfileV1/Product", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-185", name: "Landmark Appraisals", website: "http://landmarknetwork.com/profile.php?action=view-user&id=124488", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-186", name: "Lenders Allies (James)", website: "https://lendersallies.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-187", name: "Lenders Link", website: "https://www.vmscloud.co/otherusers/index2-appr-main.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-188", name: "Lenders Valuation Center", website: "https://lvs.appraisalscope.com/admin/appraiserdashboard#Appraisals", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-189", name: "MCS Valuations", website: "https://ve.mcsvaluations.com/(S(joxxayzvry3srr453tavmj55))/Appraiser/Orders.aspx?static=0&dynamic=1", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-190", name: "MIS / Mortgage Information Services", website: "https://www.vmscloud.co/otherusers/index2-appr-main.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-191", name: "MYAMC", website: "https://myamc.spurams.com/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-192", name: "MYTSI / Title Source App (now AMROCK)", website: "https://www.mytitlesourceconnection.com/Vendor/Appraiser", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-193", name: "Old Republic/ORSS", website: "https://vendor.orssvaluations.com/Account/Login?ReturnUrl=%2f", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-194", name: "PARCEL (it\'s a portal service)", website: "https://www.parcelplatform.com/reporting/login.php", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-195", name: "PCA", website: "https://pca.myvalutrac.com", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-196", name: "RP Funding", website: "http://appraisals.rpfunding.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-197", name: "Singlesource", website: "https://www.propertysmart.us/IMS_Vendor_Login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-198", name: "Spot On Valuations", website: "https://spotonvaluations.spurams.com/login.aspx?ReturnUrl=%2fdefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-199", name: "Springhouse ", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=2314", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-200", name: "Springhouse Alt source", website: "https://vendor-springhouse.altisource.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-201", name: "STARS - QUANDIS", website: "https://stars.quandis.net/Mortgage/Broker.ashx/Summary?ID=33571", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-202", name: "Streetlinks", website: "https://pipefire.streetlinks.com/pipefire/login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-203", name: "Transcontinental Value New Site", website: "https://tcvaluations.spurams.com/AppraiserDashboard.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-204", name: "VALLIGENT", website: "https://vendor-acuity.valligent.com/Account/Login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-205", name: "Valuamerica", website: "https://orders.valuamerica.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-206", name: "Valuation Connect", website: "https://vendor.valuationconnect.com/", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-207", name: "Valuation Link - New Website", website: "https://valuationlink.appraisalscope.com/index.php/login", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-208", name: "Valuation Management Group - etrack", website: "https://www.vmscloud.co/otherusers/indexAppraiserLogon.aspx?CompanyID=3300", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-209", name: "Valuation Partner", website: "https://www.valuationpartners.com/vendors/appraiser_login.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-210", name: "Value Net Desktop Site (make sure you log out properly)", website: "https://orders.valuenetweb.com/login.aspx?ReturnUrl=%2fdefault.aspx", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}},
        {id: "amc-211", name: "Vendorly", website: "https://app.vendorly.com/public/#/login?flowExecUrl=%2Fidp%2Fprofile%2FSAML2%2FRedirect%2FSSO%3F&execution=e2s1", email: "", phone: "", baseCost: "", approvedAppraisers: [], appraiserCompliance: {}}
        ];

        setAppraisers(defaultAppraisers);
        setAmcs(defaultAMCs);
        
        // Save to storage
        await window.storage.set('appraisers', JSON.stringify(defaultAppraisers));
        await window.storage.set('amcs', JSON.stringify(defaultAMCs));
      }
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAppraisers = async (newAppraisers) => {
    try {
      await window.storage.set('appraisers', JSON.stringify(newAppraisers));
      setAppraisers(newAppraisers);
    } catch (error) {
      console.error('Error saving appraisers:', error);
    }
  };

  const saveAMCs = async (newAMCs) => {
    try {
      await window.storage.set('amcs', JSON.stringify(newAMCs));
      setAmcs(newAMCs);
    } catch (error) {
      console.error('Error saving AMCs:', error);
    }
  };

  const toggleCompliance = (amcId, appraiserId, field) => {
    const updatedAMCs = amcs.map(amc => {
      if (amc.id === amcId) {
        const currentCompliance = amc.appraiserCompliance || {};
        const appraiserComp = currentCompliance[appraiserId] || {};
        
        return {
          ...amc,
          appraiserCompliance: {
            ...currentCompliance,
            [appraiserId]: {
              ...appraiserComp,
              [field]: !appraiserComp[field]
            }
          }
        };
      }
      return amc;
    });
    
    saveAMCs(updatedAMCs);
  };

  const toggleApproval = (amcId, appraiserId) => {
    const updatedAMCs = amcs.map(amc => {
      if (amc.id === amcId) {
        const currentApproved = amc.approvedAppraisers || [];
        const isApproved = currentApproved.includes(appraiserId);
        
        let newApproved;
        let newCompliance = amc.appraiserCompliance || {};
        
        if (isApproved) {
          newApproved = currentApproved.filter(id => id !== appraiserId);
        } else {
          newApproved = [...currentApproved, appraiserId];
          if (!newCompliance[appraiserId]) {
            newCompliance[appraiserId] = {};
          }
        }
        
        return {
          ...amc,
          approvedAppraisers: newApproved,
          appraiserCompliance: newCompliance
        };
      }
      return amc;
    });
    
    saveAMCs(updatedAMCs);
  };

  const checkAMCComplete = (amc) => {
    const approved = amc.approvedAppraisers || [];
    if (approved.length === 0) return false;
    
    const isEvenYear = parseInt(yearFilter) % 2 === 0;
    
    return approved.every(appId => {
      const comp = (amc.appraiserCompliance || {})[appId] || {};
      const hasEO = comp[`eo${yearFilter}`];
      const hasLicense = isEvenYear ? comp[`license${yearFilter}`] : true;
      return hasEO && hasLicense;
    });
  };

  const addAMC = () => {
    setEditingAMC({
      id: Date.now().toString(),
      name: '',
      website: '',
      email: '',
      phone: '',
      baseCost: '',
      approvedAppraisers: [],
      appraiserCompliance: {},
      notes: [], // Activity log: { id, text, status, date }
      status: 'Active' // Active, No Longer in Business, Trash, Pending
    });
  };

  const saveAMC = async (amc) => {
    if (!amc.name.trim()) {
      alert('AMC name is required');
      return;
    }

    const existingIndex = amcs.findIndex(a => a.id === amc.id);
    let updatedAMCs;
    
    if (existingIndex >= 0) {
      updatedAMCs = [...amcs];
      updatedAMCs[existingIndex] = amc;
    } else {
      updatedAMCs = [...amcs, amc];
    }

    await saveAMCs(updatedAMCs);
    setEditingAMC(null);
  };

  const addNoteToAMC = (amcId, noteText, status) => {
    if (!noteText.trim()) {
      alert('Note text is required');
      return;
    }

    const newNoteObj = {
      id: Date.now().toString(),
      text: noteText,
      status: status,
      date: new Date().toISOString()
    };

    const updatedAMCs = amcs.map(amc => {
      if (amc.id === amcId) {
        const currentNotes = amc.notes || [];
        const updatedAMC = {
          ...amc,
          notes: [...currentNotes, newNoteObj]
        };
        
        // Update the viewing state in real-time
        if (viewingAMCNotes && viewingAMCNotes.id === amcId) {
          setViewingAMCNotes(updatedAMC);
        }
        
        return updatedAMC;
      }
      return amc;
    });

    saveAMCs(updatedAMCs);
    setNewNote({ text: '', status: 'General' });
  };

  const deleteNoteFromAMC = (amcId, noteId) => {
    if (!confirm('Delete this note?')) return;

    const updatedAMCs = amcs.map(amc => {
      if (amc.id === amcId) {
        const updatedAMC = {
          ...amc,
          notes: (amc.notes || []).filter(n => n.id !== noteId)
        };
        
        // Update the viewing state in real-time
        if (viewingAMCNotes && viewingAMCNotes.id === amcId) {
          setViewingAMCNotes(updatedAMC);
        }
        
        return updatedAMC;
      }
      return amc;
    });

    saveAMCs(updatedAMCs);
  };

  const deleteAMC = async (id) => {
    if (confirm('Delete this AMC?')) {
      await saveAMCs(amcs.filter(a => a.id !== id));
    }
  };

  const addAppraiser = () => {
    setEditingAppraiser({
      id: Date.now().toString(),
      name: ''
    });
  };

  const saveAppraiser = async (appraiser) => {
    if (!appraiser.name.trim()) {
      alert('Appraiser name is required');
      return;
    }

    const existingIndex = appraisers.findIndex(a => a.id === appraiser.id);
    let updatedAppraisers;
    
    if (existingIndex >= 0) {
      updatedAppraisers = [...appraisers];
      updatedAppraisers[existingIndex] = appraiser;
    } else {
      updatedAppraisers = [...appraisers, appraiser];
    }

    await saveAppraisers(updatedAppraisers);
    setEditingAppraiser(null);
  };

  const deleteAppraiser = async (id) => {
    if (confirm('Delete this appraiser?')) {
      await saveAppraisers(appraisers.filter(a => a.id !== id));
    }
  };

  const getFilteredAMCs = () => {
    let filtered = [...amcs];
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(amc => 
        amc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by E&O completion status
    if (eoFilter) {
      filtered = filtered.filter(amc => !checkAMCComplete(amc));
    }
    
    return filtered;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const isEvenYear = parseInt(yearFilter) % 2 === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">AMC Management System - {yearFilter}</h1>
              <p className="text-gray-600">Track per-appraiser E&O and License compliance with AMCs</p>
              <p className="text-sm text-green-600 mt-1">✓ Loaded: {appraisers.length} appraisers, {amcs.length} AMCs</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg font-semibold"
                >
                  {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Dates Info */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-600" />
              <h2 className="text-sm font-semibold text-gray-700">{yearFilter} Compliance Deadlines:</h2>
            </div>
            <div className="flex gap-3">
              <div className="border-2 rounded-lg px-3 py-2 bg-blue-50 border-blue-300">
                <div className="font-semibold text-blue-700 text-xs mb-0.5">E&O Insurance</div>
                <div className="text-sm font-bold text-blue-600">March 20, {yearFilter}</div>
              </div>
              {isEvenYear && (
                <div className="border-2 rounded-lg px-3 py-2 bg-green-50 border-green-300">
                  <div className="font-semibold text-green-700 text-xs mb-0.5">License Renewal</div>
                  <div className="text-sm font-bold text-green-600">November 30, {yearFilter}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            {['dashboard', 'appraiser-eligibility', 'manage-amcs', 'manage-appraisers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'dashboard' && 'AMC Compliance Dashboard'}
                {tab === 'appraiser-eligibility' && 'Appraiser Compliance'}
                {tab === 'manage-amcs' && 'Manage AMCs'}
                {tab === 'manage-appraisers' && 'Manage Appraisers'}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {/* Search Bar */}
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AMCs by name..."
                    className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* E&O Filter */}
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 border-2 border-blue-300">
                <input
                  type="checkbox"
                  checked={eoFilter}
                  onChange={(e) => setEoFilter(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-blue-800">Show Only: Needs E&O Update</span>
              </label>
            </div>

            {/* Results Counter */}
            {(searchQuery || eoFilter) && (
              <div className="mb-4 text-sm text-gray-600">
                Showing {getFilteredAMCs().length} of {amcs.length} AMCs
                {searchQuery && <span> matching "{searchQuery}"</span>}
                {eoFilter && <span> that need E&O updates</span>}
              </div>
            )}

            <div className="space-y-4">
              {getFilteredAMCs().map(amc => {
                const approvedAppraisers = amc.approvedAppraisers || [];
                const isComplete = checkAMCComplete(amc);
                const isExpanded = expandedAMC === amc.id;
                
                return (
                  <div key={amc.id} className={`border-2 rounded-lg ${isComplete ? 'border-green-500 bg-green-50' : 'border-blue-400 bg-blue-50'}`}>
                    <button
                      onClick={() => setExpandedAMC(isExpanded ? null : amc.id)}
                      className="w-full p-4 text-left hover:bg-opacity-80 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{amc.name}</h3>
                          {amc.website && (
                            <a 
                              href={amc.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              {amc.website}
                            </a>
                          )}
                          <div className="text-sm text-gray-600 mt-1">
                            {approvedAppraisers.length} appraiser{approvedAppraisers.length !== 1 ? 's' : ''} approved
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isComplete ? (
                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                              ✓ {yearFilter} COMPLETE
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              ⚠ NEEDS UPDATE
                            </span>
                          )}
                          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>

                    {isExpanded && approvedAppraisers.length > 0 && (
                      <div className="px-4 pb-4 pt-2 border-t">
                        <h4 className="font-semibold text-gray-700 mb-3">Appraiser Compliance for {yearFilter}</h4>
                        <div className="space-y-2">
                          {approvedAppraisers.map(appId => {
                            const appraiser = appraisers.find(a => a.id === appId);
                            if (!appraiser) return null;
                            
                            const comp = (amc.appraiserCompliance || {})[appId] || {};
                            const hasEO = comp[`eo${yearFilter}`];
                            const hasLicense = comp[`license${yearFilter}`];
                            const isAppraiserComplete = hasEO && (isEvenYear ? hasLicense : true);
                            
                            return (
                              <div key={appId} className={`p-3 rounded-lg border-2 ${isAppraiserComplete ? 'border-green-400 bg-white' : 'border-blue-300 bg-white'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold text-gray-800">{appraiser.name}</div>
                                    {isAppraiserComplete && <CheckCircle className="w-5 h-5 text-green-500" />}
                                  </div>
                                  <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                      <input
                                        type="checkbox"
                                        checked={hasEO}
                                        onChange={() => toggleCompliance(amc.id, appId, `eo${yearFilter}`)}
                                        className="w-4 h-4"
                                      />
                                      <span className="font-medium">E&O {yearFilter}</span>
                                      {hasEO && <CheckCircle className="w-4 h-4 text-blue-600" />}
                                    </label>
                                    {isEvenYear && (
                                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={hasLicense}
                                          onChange={() => toggleCompliance(amc.id, appId, `license${yearFilter}`)}
                                          className="w-4 h-4"
                                        />
                                        <span className="font-medium">License {yearFilter}</span>
                                        {hasLicense && <CheckCircle className="w-4 h-4 text-green-600" />}
                                      </label>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {isExpanded && approvedAppraisers.length === 0 && (
                      <div className="px-4 pb-4 pt-2 border-t">
                        <div className="text-sm text-gray-600 italic">No appraisers approved for this AMC</div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {getFilteredAMCs().length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-gray-200">
                  <div className="text-lg font-semibold mb-2">No AMCs Found</div>
                  {searchQuery && (
                    <p>No results for "{searchQuery}"</p>
                  )}
                  {eoFilter && !searchQuery && (
                    <p>No AMCs need E&O updates for {yearFilter}</p>
                  )}
                  {!searchQuery && !eoFilter && amcs.length > 0 && (
                    <p>Try adjusting your filters</p>
                  )}
                  {amcs.length === 0 && (
                    <p>Add AMCs in the "Manage AMCs" tab to get started</p>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appraiser Compliance Tab */}
        {activeTab === 'appraiser-eligibility' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Appraiser Compliance for {yearFilter}</h2>
            
            {appraisers.length === 0 || amcs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="mb-4">Add appraisers and AMC clients to see appraiser compliance</p>
              </div>
            ) : (
              <div className="space-y-6">
                {appraisers.map(appraiser => {
                  const approvedAMCs = amcs.filter(amc => 
                    (amc.approvedAppraisers || []).includes(appraiser.id)
                  );
                  
                  const completeAMCs = approvedAMCs.filter(amc => {
                    const comp = (amc.appraiserCompliance || {})[appraiser.id] || {};
                    const hasEO = comp[`eo${yearFilter}`];
                    const hasLicense = isEvenYear ? comp[`license${yearFilter}`] : true;
                    return hasEO && hasLicense;
                  });
                  
                  const needsEO = approvedAMCs.filter(amc => {
                    const comp = (amc.appraiserCompliance || {})[appraiser.id] || {};
                    return !comp[`eo${yearFilter}`];
                  });
                  
                  const needsLicense = isEvenYear ? approvedAMCs.filter(amc => {
                    const comp = (amc.appraiserCompliance || {})[appraiser.id] || {};
                    return !comp[`license${yearFilter}`];
                  }) : [];
                  
                  const isExpanded = expandedAppraiser === appraiser.id;
                  
                  return (
                    <div key={appraiser.id} className="border-2 border-blue-300 rounded-lg bg-blue-50">
                      <button
                        onClick={() => setExpandedAppraiser(isExpanded ? null : appraiser.id)}
                        className="w-full p-6 text-left hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{appraiser.name}</h3>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span className="text-green-700 font-semibold flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Complete: {completeAMCs.length}
                              </span>
                              <span className="text-blue-700 font-semibold flex items-center gap-1">
                                <Circle className="w-4 h-4" />
                                Needs E&O: {needsEO.length}
                              </span>
                              {isEvenYear && (
                                <span className="text-green-700 font-semibold flex items-center gap-1">
                                  <Circle className="w-4 h-4" />
                                  Needs License: {needsLicense.length}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-blue-200">
                          <h4 className="font-semibold text-gray-700 mb-3">AMC Compliance Status for {yearFilter}</h4>
                          <div className="space-y-2">
                            {approvedAMCs.map(amc => {
                              const comp = (amc.appraiserCompliance || {})[appraiser.id] || {};
                              const hasEO = comp[`eo${yearFilter}`];
                              const hasLicense = comp[`license${yearFilter}`];
                              const isComplete = hasEO && (isEvenYear ? hasLicense : true);
                              
                              return (
                                <div key={amc.id} className={`p-3 rounded-lg border-2 ${isComplete ? 'border-green-400 bg-green-50' : 'border-blue-300 bg-white'}`}>
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium">{amc.name}</div>
                                    <div className="flex gap-4">
                                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                          type="checkbox"
                                          checked={hasEO}
                                          onChange={() => toggleCompliance(amc.id, appraiser.id, `eo${yearFilter}`)}
                                          className="w-4 h-4"
                                        />
                                        <span>E&O</span>
                                        {hasEO && <CheckCircle className="w-4 h-4 text-blue-600" />}
                                      </label>
                                      {isEvenYear && (
                                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                                          <input
                                            type="checkbox"
                                            checked={hasLicense}
                                            onChange={() => toggleCompliance(amc.id, appraiser.id, `license${yearFilter}`)}
                                            className="w-4 h-4"
                                          />
                                          <span>License</span>
                                          {hasLicense && <CheckCircle className="w-4 h-4 text-green-600" />}
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Manage AMCs Tab */}
        {activeTab === 'manage-amcs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage AMC Clients</h2>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Show:</label>
                  <select
                    value={amcStatusFilter}
                    onChange={(e) => setAmcStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="No Longer in Business">No Longer in Business</option>
                    <option value="Trash">Trash</option>
                    <option value="All">All AMCs</option>
                  </select>
                </div>
              </div>
              {!editingAMC && (
                <button
                  onClick={addAMC}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  Add AMC Client
                </button>
              )}
            </div>

            {editingAMC && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{amcs.find(a => a.id === editingAMC.id) ? 'Edit' : 'New'} AMC</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AMC Name *</label>
                    <input
                      type="text"
                      value={editingAMC.name}
                      onChange={(e) => setEditingAMC({ ...editingAMC, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Contact</label>
                    <input
                      type="email"
                      value={editingAMC.email}
                      onChange={(e) => setEditingAMC({ ...editingAMC, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="contact@amc.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editingAMC.phone}
                      onChange={(e) => setEditingAMC({ ...editingAMC, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={editingAMC.website}
                      onChange={(e) => setEditingAMC({ ...editingAMC, website: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Appraisal Cost</label>
                    <input
                      type="number"
                      value={editingAMC.baseCost}
                      onChange={(e) => setEditingAMC({ ...editingAMC, baseCost: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editingAMC.status || 'Active'}
                      onChange={(e) => setEditingAMC({ ...editingAMC, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="No Longer in Business">No Longer in Business</option>
                      <option value="Trash">Trash</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => saveAMC(editingAMC)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingAMC(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {amcs
                .filter(amc => amcStatusFilter === 'All' || (amc.status || 'Active') === amcStatusFilter)
                .map(amc => {
                  const statusColors = {
                    'Active': 'bg-green-100 text-green-700 border-green-300',
                    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
                    'No Longer in Business': 'bg-gray-100 text-gray-700 border-gray-300',
                    'Trash': 'bg-red-100 text-red-700 border-red-300'
                  };
                  
                  return (
                <div key={amc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        {amc.name}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusColors[(amc.status || 'Active')]}`}>
                          {amc.status || 'Active'}
                        </span>
                        {amc.notes && amc.notes.length > 0 && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {amc.notes.length} note{amc.notes.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </h3>
                      <div className="mt-1 space-y-1">
                        {amc.website && (
                          <a href={amc.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {amc.website}
                          </a>
                        )}
                        {amc.email && (
                          <div className="text-sm text-gray-600">📧 {amc.email}</div>
                        )}
                        {amc.phone && (
                          <div className="text-sm text-gray-600">📞 {amc.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingAMCNotes(amc);
                          setNoteFilter('All');
                        }}
                        className="px-3 py-2 text-purple-600 hover:bg-purple-50 rounded flex items-center gap-1 text-sm font-medium"
                        title="View/Add Notes"
                      >
                        📝 Notes
                      </button>
                      <button
                        onClick={() => setEditingAMC(amc)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAMC(amc.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm font-medium text-gray-700 mb-2">Approved Appraisers:</div>
                    <div className="flex flex-wrap gap-2">
                      {appraisers.map(appraiser => {
                        const isApproved = (amc.approvedAppraisers || []).includes(appraiser.id);
                        return (
                          <button
                            key={appraiser.id}
                            onClick={() => toggleApproval(amc.id, appraiser.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isApproved
                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                            }`}
                          >
                            {isApproved && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {appraiser.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
              })}
              {amcs.filter(amc => amcStatusFilter === 'All' || (amc.status || 'Active') === amcStatusFilter).length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No AMCs found with status: <strong>{amcStatusFilter}</strong></p>
                  <p className="text-sm mt-2">Try selecting a different status filter</p>
                </div>
              )}
              {amcs.length === 0 && !editingAMC && (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No AMC clients yet. Click "Add AMC Client" to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manage Appraisers Tab */}
        {activeTab === 'manage-appraisers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Appraisers</h2>
              {!editingAppraiser && (
                <button
                  onClick={addAppraiser}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Plus className="w-4 h-4" />
                  Add Appraiser
                </button>
              )}
            </div>

            {editingAppraiser && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{appraisers.find(a => a.id === editingAppraiser.id) ? 'Edit' : 'New'} Appraiser</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appraiser Name *</label>
                  <input
                    type="text"
                    value={editingAppraiser.name}
                    onChange={(e) => setEditingAppraiser({ ...editingAppraiser, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Full Name"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveAppraiser(editingAppraiser)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingAppraiser(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appraisers.map(appraiser => (
                <div key={appraiser.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{appraiser.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingAppraiser(appraiser)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAppraiser(appraiser.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {appraisers.length === 0 && !editingAppraiser && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No appraisers yet. Click "Add Appraiser" to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes Modal */}
        {viewingAMCNotes && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b bg-purple-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{viewingAMCNotes.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">Activity Log & Notes</p>
                  </div>
                  <button
                    onClick={() => setViewingAMCNotes(null)}
                    className="p-2 hover:bg-purple-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add Note Form */}
              <div className="p-6 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-3">Add New Note</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newNote.status}
                      onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="General">General</option>
                      <option value="Sent Email">Sent Email</option>
                      <option value="No Response">No Response</option>
                      <option value="Awaiting Reply">Awaiting Reply</option>
                      <option value="Follow Up Needed">Follow Up Needed</option>
                      <option value="Documents Sent">Documents Sent</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Issue">Issue</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                    <textarea
                      value={newNote.text}
                      onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows="3"
                      placeholder="Enter your note or comment..."
                    />
                  </div>
                  <button
                    onClick={() => addNoteToAMC(viewingAMCNotes.id, newNote.text, newNote.status)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Activity History
                    {viewingAMCNotes.notes && viewingAMCNotes.notes.length > 0 && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({[...viewingAMCNotes.notes].filter(note => noteFilter === 'All' || note.status === noteFilter).length}
                        {noteFilter !== 'All' && ` of ${viewingAMCNotes.notes.length}`})
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Filter by:</label>
                    <select
                      value={noteFilter}
                      onChange={(e) => setNoteFilter(e.target.value)}
                      className="px-3 py-1 border rounded-lg text-sm"
                    >
                      <option value="All">All Categories</option>
                      <option value="General">General</option>
                      <option value="Sent Email">Sent Email</option>
                      <option value="No Response">No Response</option>
                      <option value="Awaiting Reply">Awaiting Reply</option>
                      <option value="Follow Up Needed">Follow Up Needed</option>
                      <option value="Documents Sent">Documents Sent</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Issue">Issue</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                {viewingAMCNotes.notes && viewingAMCNotes.notes.length > 0 ? (
                  <div className="space-y-3">
                    {[...viewingAMCNotes.notes]
                      .filter(note => noteFilter === 'All' || note.status === noteFilter)
                      .reverse()
                      .map(note => {
                      const noteDate = new Date(note.date);
                      const statusColors = {
                        'General': 'bg-gray-100 text-gray-700',
                        'Sent Email': 'bg-blue-100 text-blue-700',
                        'No Response': 'bg-orange-100 text-orange-700',
                        'Awaiting Reply': 'bg-yellow-100 text-yellow-700',
                        'Follow Up Needed': 'bg-red-100 text-red-700',
                        'Documents Sent': 'bg-purple-100 text-purple-700',
                        'Approved': 'bg-green-100 text-green-700',
                        'Pending': 'bg-yellow-100 text-yellow-700',
                        'Issue': 'bg-red-100 text-red-700',
                        'Resolved': 'bg-green-100 text-green-700'
                      };

                      return (
                        <div key={note.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[note.status] || 'bg-gray-100 text-gray-700'}`}>
                              {note.status}
                            </span>
                            <button
                              onClick={() => deleteNoteFromAMC(viewingAMCNotes.id, note.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="text-gray-800 mb-2">{note.text}</p>
                          <p className="text-xs text-gray-500">
                            {noteDate.toLocaleDateString()} at {noteDate.toLocaleTimeString()}
                          </p>
                        </div>
                      );
                    })}
                    {[...viewingAMCNotes.notes].filter(note => noteFilter === 'All' || note.status === noteFilter).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No notes found with status: <strong>{noteFilter}</strong></p>
                        <p className="text-sm mt-2">Try selecting a different category or "All Categories"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No notes yet. Add your first note above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
