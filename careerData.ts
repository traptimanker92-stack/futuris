import { CareerSimulation, Opportunity, MicroChallenge, CareerFutureTrajectory, RoadmapNode } from '../types';

export const GLOBAL_CAREERS_DIRECTORY = [
  { id: 'ai_engineer', title: 'AI & Machine Learning Engineer', category: 'Tech & AI', icon: 'Brain', avgSalary: '$145,000 - $260,000', demand: 'Hypergrowth', description: 'Architect neural networks, LLM agents, and computer vision pipelines.' },
  { id: 'cybersecurity_expert', title: 'Cybersecurity & Zero-Trust Architect', category: 'Tech & AI', icon: 'ShieldAlert', avgSalary: '$135,000 - $240,000', demand: 'Hypergrowth', description: 'Defend enterprise infrastructure, engineer cryptographic protocols, and conduct red-team threat hunting.' },
  { id: 'biomaterials_engineer', title: 'Biomaterials & Regenerative Tissue Engineer', category: 'Healthcare & Core', icon: 'HeartPulse', avgSalary: '$115,000 - $210,000', demand: 'Very High', description: 'Synthesize biocompatible scaffolds, bio-printed organoids, and responsive therapeutic implants.' },
  { id: 'fullstack_architect', title: 'Full-Stack Software Architect', category: 'Tech & AI', icon: 'Code2', avgSalary: '$130,000 - $220,000', demand: 'Very High', description: 'Design cloud-native microservices, modern frontend systems, and scalable backend infrastructure.' },
  { id: 'cloud_devops', title: 'Cloud & DevOps Platform Engineer', category: 'Tech & AI', icon: 'Cloud', avgSalary: '$125,000 - $210,000', demand: 'Very High', description: 'Build CI/CD automation, Kubernetes clusters, and multi-region resilience.' },
  { id: 'product_manager', title: 'AI & Enterprise Product Manager', category: 'Design & Creative', icon: 'Palette', avgSalary: '$125,000 - $220,000', demand: 'Hypergrowth', description: 'Define 0-to-1 product strategy, user discovery, unit economics, and AI-driven growth loops.' },
  { id: 'master_chef', title: 'Executive Culinary Innovator & Gastronomy Lead', category: 'Design & Creative', icon: 'Flame', avgSalary: '$85,000 - $180,000', demand: 'High', description: 'Curate avant-garde tasting menus, sustainable culinary operations, and sensory food chemistry.' },
  { id: 'data_scientist', title: 'Data Scientist & Quantitative Analyst', category: 'Tech & AI', icon: 'LineChart', avgSalary: '$125,000 - $230,000', demand: 'High', description: 'Extract predictive intelligence, train ML models, and build decision engines.' },
  { id: 'neurosurgeon_specialist', title: 'Clinical Neurosurgeon & Medical Innovator', category: 'Healthcare & Core', icon: 'Stethoscope', avgSalary: '$350,000 - $650,000', demand: 'Very High', description: 'Perform micro-neurosurgery, brain-computer interface implants, and clinical research.' },
  { id: 'investment_banker', title: 'Investment Banker & Fintech Strategist', category: 'Finance & Business', icon: 'TrendingUp', avgSalary: '$140,000 - $350,000', demand: 'High', description: 'Execute M&A deals, quantitative trading models, and financial restructuring.' },
  { id: 'upsc_civil_services', title: 'Civil Services Officer (IAS / IPS / IFS)', category: 'Civil Services & Public', icon: 'Landmark', avgSalary: '₹12L - ₹30L + Apex Benefits', demand: 'Extremely Competitive', description: 'Lead public policy execution, district administration, and international diplomacy.' },
  { id: 'robotics_engineer', title: 'Autonomous Robotics & Mechatronics Specialist', category: 'Core Engineering', icon: 'Cpu', avgSalary: '$120,000 - $210,000', demand: 'Hypergrowth', description: 'Build SLAM navigation, ROS2 control systems, and humanoid robotic actuators.' },
  { id: 'aerospace_engineer', title: 'Aerospace & Propulsion Engineer', category: 'Core Engineering', icon: 'Rocket', avgSalary: '$125,000 - $225,000', demand: 'High', description: 'Design orbital launch vehicles, orbital dynamics, and aerodynamic simulation.' },
  { id: 'corporate_lawyer', title: 'Tech & Venture Capital Corporate Lawyer', category: 'Law & Governance', icon: 'Scale', avgSalary: '$160,000 - $380,000', demand: 'High', description: 'Handle cross-border intellectual property, startup financing, and AI regulatory compliance.' },
  { id: 'quantum_computing_physicist', title: 'Quantum Computing Research Scientist', category: 'Research & Deep Science', icon: 'Atom', avgSalary: '$150,000 - $280,000', demand: 'Emerging', description: 'Develop superconducting qubit algorithms, error correction, and quantum cryptography.' },
  { id: 'renewable_energy_architect', title: 'Clean Energy & Smart Grid Architect', category: 'Core Engineering', icon: 'Zap', avgSalary: '$115,000 - $195,000', demand: 'Very High', description: 'Engineer grid-scale battery storage, solar-wind hybridization, and carbon-negative systems.' },
];

/**
 * Domain-specific skills, tools, benchmarks, and deliverables engine
 */
interface DomainRule {
  keywords: string[];
  category: string;
  skills: string[];
  tools: string[];
  deliverableTitle: string;
  deliverableDesc: string;
  starterCode: string;
  lang: string;
  avgStart: string;
  avgSenior: string;
  companies: string[];
  demand: 'Hypergrowth' | 'Very High' | 'High' | 'Extremely Competitive' | 'Stable';
}

const DOMAIN_KNOWLEDGE_BASE: DomainRule[] = [
  {
    keywords: ['cyber', 'security', 'infosec', 'hacker', 'soc', 'cryptography', 'penetration', 'zero trust'],
    category: 'Tech & AI',
    skills: ['Zero Trust Architecture', 'Threat Modeling & SIEM', 'Penetration Testing (OSCP)', 'Network Forensics', 'Cryptography & PKI', 'Cloud Security (AWS/GCP IAM)', 'Incident Response'],
    tools: ['Wireshark', 'Burp Suite Pro', 'Splunk / Wazuh', 'Metasploit', 'Nmap', 'Terraform', 'Suricata'],
    deliverableTitle: 'Automated Threat Detection & Honeypot Pipeline',
    deliverableDesc: 'Architect an automated intrusion detection honeypot with packet inspection, anomaly alerts, and CVE scoring telemetry.',
    starterCode: `// Zero-Trust Intrusion Detection Engine
import { createHmac } from 'crypto';

export interface SecurityEvent {
  ip: string;
  endpoint: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export function auditTraffic(event: SecurityEvent, secretKey: string): { riskScore: number; blocked: boolean } {
  const isMaliciousIP = event.ip.startsWith('198.51.') || event.ip.startsWith('203.0.113.');
  const sqlInjectionPattern = /(\\b(UNION|SELECT|DROP|INSERT|DELETE)\\b|['";])/i;
  const payloadStr = JSON.stringify(event.payload);
  
  let riskScore = 0;
  if (isMaliciousIP) riskScore += 65;
  if (sqlInjectionPattern.test(payloadStr)) riskScore += 45;

  const signature = createHmac('sha256', secretKey).update(payloadStr).digest('hex');
  return {
    riskScore: Math.min(100, riskScore),
    blocked: riskScore >= 70,
  };
}`,
    lang: 'typescript',
    avgStart: '$110,000 / yr',
    avgSenior: '$240,000+ / yr',
    companies: ['CrowdStrike', 'Palo Alto Networks', 'Cloudflare', 'Mandiant / Google', 'Microsoft Security', 'Palantir'],
    demand: 'Hypergrowth',
  },
  {
    keywords: ['biomaterial', 'tissue', 'biomedical', 'bio', 'regenerative', 'prosthetic', 'genetics', 'pharma', 'biology'],
    category: 'Healthcare & Core',
    skills: ['Hydrogel Synthesis', 'Cellular Biocompatibility Assays', 'Microfluidics & Lab-on-Chip', 'FDA 510(k) Regulatory Protocols', 'Polymer Characterization (FTIR/SEM)', 'Bio-printing Matrices'],
    tools: ['COMSOL Multiphysics', 'MATLAB Bio-Toolbox', 'ImageJ', 'CRISPR Design Suite', 'Autodesk Fusion 360', 'PyMOL'],
    deliverableTitle: 'Biocompatible Scaffold Degradation & Porosity Simulation',
    deliverableDesc: 'Model the mechanical stress dissipation and nutrient diffusion rates across a 3D porous nano-composite scaffold.',
    starterCode: `# Biomaterials Porosity & Scaffold Fluid Diffusion Simulation
import numpy as np

def compute_fluid_permeability(porosity: float, pore_diameter_um: float) -> dict:
    """Calculates hydraulic permeability (Darcy-Kozeny) for bio-scaffold"""
    if not (0.3 <= porosity <= 0.95):
        raise ValueError("Porosity must be between 30% and 95% for cell viability.")
    
    # Kozeny-Carman model simulation
    k_factor = (porosity ** 3) / ((1.0 - porosity) ** 2)
    permeability_darcy = (pore_diameter_um ** 2) * k_factor * 1e-4
    shear_stress_dynes = 1.45 / (porosity * 1.2)
    
    return {
        "porosity_pct": round(porosity * 100, 2),
        "permeability_darcy": round(permeability_darcy, 4),
        "wall_shear_stress": round(shear_stress_dynes, 3),
        "osteoblast_adhesion_favorable": 0.5 <= shear_stress_dynes <= 2.5
    }

# Test sample run
print(compute_fluid_permeability(porosity=0.78, pore_diameter_um=150.0))`,
    lang: 'python',
    avgStart: '$98,000 / yr',
    avgSenior: '$215,000+ / yr',
    companies: ['Medtronic', 'Moderna', 'Boston Scientific', 'Illumina', 'Johnson & Johnson MedTech', 'Genentech'],
    demand: 'Very High',
  },
  {
    keywords: ['product', 'pm', 'growth', 'scrum', 'agile', 'roadmap', 'feature', 'user experience'],
    category: 'Design & Creative',
    skills: ['0-to-1 Product Discovery', 'Opportunity Solution Trees', 'Cohort Retention & Funnel Analytics', 'PRD & Spec Writing', 'A/B Test Statistical Significance', 'Unit Economics & Pricing Strategy'],
    tools: ['Mixpanel / Amplitude', 'Figma', 'Linear / Jira', 'Notion', 'PostHog', 'SQL', 'Tableau'],
    deliverableTitle: 'Multi-Variant Feature Impact & Retention Model',
    deliverableDesc: 'Build an automated cohort retention model calculating P95 confidence intervals and customer lifetime value (LTV).',
    starterCode: `// Product Growth & Retention Analysis Engine
export interface CohortData {
  cohortName: string;
  initialUsers: number;
  activeWeeklyUsers: number[];
  arpuMonthly: number;
}

export function evaluateCohortLTV(cohort: CohortData): { retentionWeek4: number; projectedLtv6Mo: number; healthGrade: string } {
  const w4Active = cohort.activeWeeklyUsers[3] || 0;
  const retentionWeek4 = (w4Active / cohort.initialUsers) * 100;
  
  // Calculate decay rate
  const avgRetentionRate = cohort.activeWeeklyUsers.reduce((a, b) => a + b, 0) / (cohort.activeWeeklyUsers.length * cohort.initialUsers);
  const projectedLtv6Mo = cohort.arpuMonthly * 6 * avgRetentionRate;

  let healthGrade = 'Needs Validation';
  if (retentionWeek4 >= 40) healthGrade = 'Strong PMF (Tier-1)';
  else if (retentionWeek4 >= 25) healthGrade = 'Moderate PMF';

  return {
    retentionWeek4: Number(retentionWeek4.toFixed(1)),
    projectedLtv6Mo: Number(projectedLtv6Mo.toFixed(2)),
    healthGrade
  };
}`,
    lang: 'typescript',
    avgStart: '$105,000 / yr',
    avgSenior: '$230,000+ / yr',
    companies: ['Stripe', 'Google', 'Airbnb', 'Figma', 'Uber', 'Spotify', 'OpenAI'],
    demand: 'Hypergrowth',
  },
  {
    keywords: ['chef', 'culinary', 'restaurant', 'food', 'cooking', 'gastronomy', 'baking', 'hospitality'],
    category: 'Design & Creative',
    skills: ['Molecular Gastronomy & Flavor Pairing', 'Menu Engineering & Cost Matrix', 'HACCP & Kitchen Sanitation', 'Sensory Texture Science', 'Fermentation & Sous-Vide Mastery', 'Sustainable Sourcing & Farm-to-Table'],
    tools: ['Kitchen Inventory Systems', 'Combitherm Programmable Ovens', 'Chamber Vacuum Sealers', 'Refractometers & pH Meters', 'Rotovap Distillers'],
    deliverableTitle: 'Sensory Flavor Profile & Kitchen Cost Precision Algorithm',
    deliverableDesc: 'Develop a menu cost precision matrix that balances food waste reduction, volatile aroma compound pairings, and gross margin.',
    starterCode: `# Culinary Chemistry & Menu Precision Matrix
def analyze_dish_viability(ingredient_costs: list[float], target_margin: float, flavor_matrix: dict) -> dict:
    total_food_cost = sum(ingredient_costs)
    suggested_menu_price = total_food_cost / (1.0 - target_margin)
    
    # Analyze flavor balance
    umami = flavor_matrix.get('umami', 0)
    acidity = flavor_matrix.get('acidity', 0)
    salt = flavor_matrix.get('salt', 0)
    is_balanced = (umami >= 7 and acidity >= 5 and salt >= 6)

    return {
        "total_cost": round(total_food_cost, 2),
        "menu_price": round(suggested_menu_price, 2),
        "target_margin_pct": f"{int(target_margin * 100)}%",
        "flavor_harmony_status": "Harmonious Signature Dish" if is_balanced else "Needs Acidity / Umami Tuning"
    }

print(analyze_dish_viability([4.50, 2.20, 1.80, 0.90], 0.72, {'umami': 8, 'acidity': 6, 'salt': 7}))`,
    lang: 'python',
    avgStart: '$65,000 / yr',
    avgSenior: '$175,000+ / yr',
    companies: ['Michelin-Star Restaurants', 'Luxury Hotel Groups (Four Seasons, Ritz)', 'Culinary R&D Studios', 'Global Gastronomy Collectives'],
    demand: 'High',
  },
  {
    keywords: ['ai', 'machine learning', 'ml', 'deep learning', 'neural', 'llm', 'nlp', 'computer vision'],
    category: 'Tech & AI',
    skills: ['PyTorch 2.x & Distributed Training', 'Transformer Architectures & Attention', 'RAG & Vector Embeddings', 'LoRA & QLoRA Fine-tuning', 'vLLM / TensorRT Inference', 'Reinforcement Learning (PPO/DPO)'],
    tools: ['Python 3.12', 'PyTorch', 'Hugging Face', 'Qdrant / Pinecone', 'LangChain / LangGraph', 'Weights & Biases', 'Docker'],
    deliverableTitle: 'Production RAG Query Pipeline with Hybrid Reranking',
    deliverableDesc: 'Build a high-throughput hybrid retrieval augmented generation pipeline with dense/sparse search and hallucination guardrails.',
    starterCode: `# Production Vector Search & Cosine Similarity Engine
import torch
import torch.nn.functional as F

def compute_similarity(query_emb: torch.Tensor, doc_embeddings: torch.Tensor) -> torch.Tensor:
    """Compute normalized cosine similarity matrix"""
    q_norm = F.normalize(query_emb, p=2, dim=-1)
    d_norm = F.normalize(doc_embeddings, p=2, dim=-1)
    return torch.matmul(q_norm, d_norm.T)

if __name__ == "__main__":
    q = torch.randn(1, 512)
    docs = torch.randn(10, 512)
    scores = compute_similarity(q, docs)
    print(f"Top match index: {torch.argmax(scores).item()} with score: {torch.max(scores).item():.4f}")`,
    lang: 'python',
    avgStart: '$125,000 / yr',
    avgSenior: '$280,000+ / yr',
    companies: ['Google DeepMind', 'OpenAI', 'Anthropic', 'NVIDIA', 'Meta AI', 'Microsoft Research'],
    demand: 'Hypergrowth',
  },
  {
    keywords: ['doctor', 'surgeon', 'medicine', 'clinical', 'physician', 'neurosurgeon', 'cardiologist'],
    category: 'Healthcare & Core',
    skills: ['Micro-Surgical Technique', 'Clinical Diagnostics & Differential Pathology', 'Biomedical Imaging (fMRI, CT, PET)', 'Emergency Trauma Management', 'Clinical Trial Design', 'Medical Ethics & Patient Communication'],
    tools: ['Surgical Navigation Systems', 'PACS Imaging Workstations', 'Stereotactic Frames', 'Electronic Health Records (Epic)', 'Robotic Surgery Consoles (da Vinci)'],
    deliverableTitle: 'Stereotactic Surgical Trajectory & Risk Mapping Model',
    deliverableDesc: 'Calculate optimal probe trajectory angles that avoid critical vascular structures in 3D cranial coordinate space.',
    starterCode: `# Stereotactic Trajectory Safety Calculator
import math

def calculate_surgical_trajectory(entry_point: tuple, target_node: tuple, critical_vessel: tuple) -> dict:
    """Calculates Euclidean safety clearance from critical vascular structures"""
    # Vector from entry to target
    vx = target_node[0] - entry_point[0]
    vy = target_node[1] - entry_point[1]
    vz = target_node[2] - entry_point[2]
    traj_len = math.sqrt(vx**2 + vy**2 + vz**2)
    
    # Distance to vessel point
    px = critical_vessel[0] - entry_point[0]
    py = critical_vessel[1] - entry_point[1]
    pz = critical_vessel[2] - entry_point[2]
    
    # Dot product projection
    t = max(0.0, min(1.0, (px*vx + py*vy + pz*vz) / (traj_len**2)))
    closest_x = entry_point[0] + t * vx
    closest_y = entry_point[1] + t * vy
    closest_z = entry_point[2] + t * vz
    
    margin_mm = math.sqrt((critical_vessel[0]-closest_x)**2 + (critical_vessel[1]-closest_y)**2 + (critical_vessel[2]-closest_z)**2)
    return {
        "trajectory_depth_mm": round(traj_len, 2),
        "vessel_clearance_mm": round(margin_mm, 2),
        "status": "APPROVED (Safe Margin > 5mm)" if margin_mm >= 5.0 else "REJECTED (High Hemorrhage Risk)"
    }

print(calculate_surgical_trajectory((12, 45, 80), (14, 48, 110), (19, 50, 95)))`,
    lang: 'python',
    avgStart: '$220,000 / yr',
    avgSenior: '$550,000+ / yr',
    companies: ['Mayo Clinic', 'Johns Hopkins Medicine', 'Cleveland Clinic', 'Massachusetts General Hospital', 'Stanford Health Care'],
    demand: 'Very High',
  },
];

/**
 * Searches the web/Wikipedia API dynamically to extract live context, overviews, and terminology.
 */
export async function fetchLiveCareerIntelligence(query: string): Promise<{
  title: string;
  overview: string;
  source: string;
}> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      title: 'Universal AI Engineer',
      overview: 'Develop cutting-edge intelligence systems, scalable algorithms, and real-world software.',
      source: 'Futuris Live Intelligence Engine',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.extract && data.extract.length > 30) {
        return {
          title: data.title || cleanQuery,
          overview: data.extract,
          source: 'Live Wikipedia Knowledge API',
        };
      }
    }
  } catch {
    // Graceful fallback to live synthesis
  }

  return {
    title: cleanQuery,
    overview: `A comprehensive, high-velocity simulation for mastering the ${cleanQuery} ecosystem. This pathway covers foundational theoretical frameworks, mission-critical tool mastery, industry capstone validation, and leadership scaling.`,
    source: 'Futuris Neural Synthesis Engine',
  };
}

/**
 * Generates an end-to-end multi-future career simulation dynamically for ANY query.
 */
export function generateDynamicCareerSimulation(
  rawQuery: string,
  categoryHint?: string,
  liveOverview?: string,
  liveSource?: string
): CareerSimulation {
  const query = rawQuery.trim() || 'AI & Machine Learning Engineer';
  const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const lowerQuery = query.toLowerCase();

  // Find matching domain rule or synthesize
  const matchedRule = DOMAIN_KNOWLEDGE_BASE.find(rule =>
    rule.keywords.some(kw => lowerQuery.includes(kw))
  );

  const category = categoryHint || matchedRule?.category || (
    lowerQuery.includes('eng') || lowerQuery.includes('robot') || lowerQuery.includes('aerospace') ? 'Core Engineering' :
    lowerQuery.includes('law') || lowerQuery.includes('legal') || lowerQuery.includes('policy') ? 'Law & Governance' :
    lowerQuery.includes('finance') || lowerQuery.includes('bank') || lowerQuery.includes('trade') ? 'Finance & Business' :
    lowerQuery.includes('physic') || lowerQuery.includes('quantum') || lowerQuery.includes('math') ? 'Research & Deep Science' :
    'Tech & AI'
  );

  const keySkills = matchedRule?.skills || [
    `${query} Core Theory & Fundamentals`,
    'Domain Systems Architecture',
    'Advanced Problem Solving & Diagnostics',
    'Quantitative Metrics & Optimization',
    'Cross-Functional Collaboration',
    'Industry Standards & Regulatory Compliance',
  ];

  const toolsAndTech = matchedRule?.tools || [
    'Industry-Standard Tooling Suite',
    'Modern Telemetry & Analytics',
    'Simulation & Modeling Environment',
    'Version Control & CI/CD Pipelines',
    'Automated Quality Assurance',
  ];

  const deliverableTitle = matchedRule?.deliverableTitle || `${query} Mission-Critical Capstone System`;
  const deliverableDesc = matchedRule?.deliverableDesc || `Architect, implement, and benchmark an industry-ready production deliverable demonstrating high-yield expertise in ${query}.`;
  const starterCode = matchedRule?.starterCode || `// Futuris Code Validator: ${query}
export function executeDomainValidation(inputData: Record<string, unknown>): { status: string; score: number; executionTimeMs: number } {
  console.log("Analyzing ${query} payload...");
  return {
    status: "VALIDATED_SUCCESSFULLY",
    score: 96,
    executionTimeMs: 1.45,
  };
}

console.log(executeDomainValidation({ targetRole: "${query}", verificationStage: "Phase 1" }));`;
  const codeLang = matchedRule?.lang || 'typescript';

  const avgStart = matchedRule?.avgStart || '$92,000 / yr';
  const avgSenior = matchedRule?.avgSenior || '$220,000+ / yr';
  const companies = matchedRule?.companies || ['Top-Tier Industry Leaders', 'Global Innovation Labs', 'Frontier Enterprises', 'High-Growth Tech Scaleups'];
  const demand = matchedRule?.demand || 'Hypergrowth';

  const defaultOverview = liveOverview || matchedRule?.deliverableDesc || `A comprehensive simulation and step-by-step roadmap for entering, scaling, and mastering the ${query} ecosystem worldwide.`;

  // 3 Distinct Multi-Future Trajectories
  const futures: CareerFutureTrajectory[] = [
    {
      id: `future_${slug}_accelerated`,
      title: `Accelerated Enterprise Track (${query})`,
      archetype: 'accelerated_traditional',
      badge: 'High Industry Demand',
      description: `Rapidly climb the high-tier corporate & enterprise ladder from associate specialist to principal lead with high market stability and strong equity upside.`,
      estimatedTimeline: '12 - 18 Months to Lead Role',
      projectedPeakSalary: avgSenior,
      riskRewardLevel: 'Moderate Risk / High Stability',
      fitScore: 94,
      nodes: [
        {
          id: `node_${slug}_acc_1`,
          phaseNumber: 1,
          timeframe: 'Months 1 - 3',
          title: `Foundations of Modern ${query}`,
          roleStage: `Associate ${query}`,
          tagline: 'Master Fundamental Principles, Modern Workflows & Toolchains',
          summary: `Establish rigorous mastery over foundational concepts, domain math, modern industry workflows, and automated verification protocols.`,
          keySkills: keySkills.slice(0, 4),
          toolsAndTech: toolsAndTech.slice(0, 3),
          tasks: [
            { id: `t_${slug}_1`, title: `Complete hands-on foundational benchmark in ${query}`, description: 'Implement core problem-solving pipeline and verify against baseline tests.', estimatedHours: 12, completed: true, category: 'core_skill' },
            { id: `t_${slug}_2`, title: `Build end-to-end sandbox project demonstrating ${keySkills[0]}`, description: 'Deploy working prototype and configure monitoring telemetry.', estimatedHours: 18, completed: true, category: 'project' },
            { id: `t_${slug}_3`, title: `Pass industry-standard technical validation assessment`, description: 'Achieve >90% score on automated role verification rubric.', estimatedHours: 8, completed: false, category: 'certification' },
          ],
          deliverableProject: {
            title: `Phase 1 Core: ${deliverableTitle}`,
            description: deliverableDesc,
            difficulty: 'Intermediate',
            language: codeLang,
            starterCode: starterCode,
            validationCriteria: ['Clean modular architecture', 'Handles edge-case inputs gracefully', 'Execution latency sub-50ms'],
          },
          salaryRange: avgStart,
          first30DaysPlan: [
            `Day 1-7: Deep-dive into foundational principles of ${query} and setup professional development environment.`,
            `Day 8-14: Build your first functional prototype exercising ${keySkills[0]}.`,
            `Day 15-22: Optimize performance bottlenecks and implement robust error recovery logic.`,
            `Day 23-30: Validate deliverable in the Futuris Live Code IDE and generate cryptographic verification proof.`,
          ],
          skillGapAnalysis: {
            criticalGaps: [`High-throughput execution speed in ${keySkills[1]}`, 'Automated regression testing schemas'],
            prerequisites: ['Analytical problem solving', 'Domain fundamentals'],
            marketDemand: demand,
          },
          isCompleted: false,
        },
        {
          id: `node_${slug}_acc_2`,
          phaseNumber: 2,
          timeframe: 'Months 4 - 8',
          title: `Scale & Systems Mastery in ${query}`,
          roleStage: `Senior ${query}`,
          tagline: 'Lead Complex Systems, High-Concurrency Deployments & Cross-Team Impact',
          summary: `Advance into large-scale architecture, distributed team leadership, mission-critical safety or performance guarantees, and executive strategic alignment.`,
          keySkills: keySkills.slice(2, 6),
          toolsAndTech: toolsAndTech.slice(2, 5),
          tasks: [
            { id: `t_${slug}_4`, title: `Architect high-availability production pipeline for ${query}`, description: 'Handle multi-region redundancy and failover recovery.', estimatedHours: 20, completed: false, category: 'core_skill' },
            { id: `t_${slug}_5`, title: `Conduct architecture review & publish technical whitepaper`, description: 'Document trade-offs and latency benchmarks for stakeholder review.', estimatedHours: 14, completed: false, category: 'networking' },
          ],
          deliverableProject: {
            title: `Phase 2 Capstone: Scaled Resilient ${query} System`,
            description: `Full-scale system integration featuring distributed telemetry, automated load balancing, and SLA guarantees.`,
            difficulty: 'Advanced',
            language: codeLang,
            starterCode: starterCode,
            validationCriteria: ['High-availability compliance', 'Zero-downtime resilience', 'Full automated test coverage'],
          },
          salaryRange: avgSenior,
          first30DaysPlan: [
            `Day 1-10: Review high-concurrency design patterns and fault tolerance strategies in ${query}.`,
            `Day 11-20: Build the Phase 2 system deliverable with integration tests.`,
            `Day 21-30: Run stress tests and present findings in mock technical interview simulation.`,
          ],
          skillGapAnalysis: {
            criticalGaps: ['Distributed state consistency', 'High-volume throughput optimization'],
            prerequisites: [`Phase 1 ${query} verification`],
            marketDemand: demand,
          },
          isCompleted: false,
        },
      ],
    },
    {
      id: `future_${slug}_specialist`,
      title: `Deep-Tech & R&D Specialist Track`,
      archetype: 'specialist_deep_tech',
      badge: 'R&D & Patent Focus',
      description: `Specialize in cutting-edge research, advanced algorithmic design, patent creation, and frontier domain breakthroughs.`,
      estimatedTimeline: '18 - 24 Months to Principal Scientist',
      projectedPeakSalary: `$260,000 - $380,000+`,
      riskRewardLevel: 'Calculated Risk / Deep Expertise',
      fitScore: 89,
      nodes: [
        {
          id: `node_${slug}_spec_1`,
          phaseNumber: 1,
          timeframe: 'Months 1 - 6',
          title: `Advanced Applied R&D in ${query}`,
          roleStage: `Research Specialist / Principal ${query}`,
          tagline: 'Pioneer Novel Methodologies & High-Precision Innovations',
          summary: 'Publish algorithmic or technical innovations, collaborate with top scientific labs, and push the performance frontier.',
          keySkills: ['Advanced Mathematical Modeling', ...keySkills.slice(1, 4)],
          toolsAndTech: toolsAndTech,
          tasks: [
            { id: `t_${slug}_s1`, title: 'Benchmark novel algorithmic formulation vs state-of-the-art', description: 'Achieve demonstrable efficiency gains and publish repeatable benchmark scripts.', estimatedHours: 24, completed: false, category: 'core_skill' },
            { id: `t_${slug}_s2`, title: 'File provisional patent or open-source reference framework', description: 'Author technical documentation and reference codebase.', estimatedHours: 30, completed: false, category: 'project' },
          ],
          deliverableProject: {
            title: `Frontier Novel Architecture for ${query}`,
            description: 'State-of-the-art experimental model delivering 2x computational or physical efficiency improvement.',
            difficulty: 'Industry Ready',
            language: codeLang,
            starterCode: starterCode,
            validationCriteria: ['Statistically validated empirical results', 'Rigorous mathematical proof', 'Repeatable harness'],
          },
          salaryRange: `$140,000 - $220,000`,
          first30DaysPlan: [
            'Day 1-10: Literature review of top peer-reviewed papers in the domain.',
            'Day 11-20: Code the baseline comparison harness in the Futuris Code IDE.',
            'Day 21-30: Formulate novel optimization hypothesis and validate empirically.',
          ],
          skillGapAnalysis: {
            criticalGaps: ['Empirical research methodology', 'Peer-review technical writing'],
            prerequisites: ['Advanced domain mathematics and systems theory'],
            marketDemand: 'Hypergrowth',
          },
          isCompleted: false,
        },
      ],
    },
    {
      id: `future_${slug}_entrepreneur`,
      title: `High-Growth Founder & Venture Leadership`,
      archetype: 'frontier_entrepreneurial',
      badge: 'Venture & High Equity',
      description: `Leverage your domain authority in ${query} to launch a venture-backed startup, solve high-value enterprise pain points, and scale an industry-defining company.`,
      estimatedTimeline: '12 - 36 Months',
      projectedPeakSalary: '$140,000 base + Massive Venture Equity ($1M+ Upside)',
      riskRewardLevel: 'High Risk / Exponential Upside',
      fitScore: 86,
      nodes: [
        {
          id: `node_${slug}_ent_1`,
          phaseNumber: 1,
          timeframe: 'Months 1 - 6',
          title: `0-to-1 Product-Market Fit in ${query}`,
          roleStage: 'Founder & Chief Architect',
          tagline: 'Customer Discovery, High-Velocity Prototyping & Seed Traction',
          summary: 'Build a differentiated high-value product solving acute pain points, acquire initial paying customers, and prepare for investor pitch rounds.',
          keySkills: ['0-to-1 Product Architecture', 'Customer Acquisition', 'Financial Runway Planning', 'Venture Pitching'],
          toolsAndTech: ['Modern Web Stack', 'Stripe Billing', 'Analytics Telemetry', 'CRM & Outreach'],
          tasks: [
            { id: `t_${slug}_e1`, title: 'Acquire first 10 paying customers or signed LOIs', description: 'Validate product pricing and retain customer feedback loops.', estimatedHours: 40, completed: false, category: 'networking' },
            { id: `t_${slug}_e2`, title: 'Ship production MVP with payment rails & automated onboarding', description: 'Ensure 99.9% uptime and sub-second response times.', estimatedHours: 35, completed: false, category: 'project' },
          ],
          deliverableProject: {
            title: `Production-Ready SaaS Platform for ${query}`,
            description: 'Full-stack operational product with automated onboarding, telemetry, and payment gateway.',
            difficulty: 'Industry Ready',
            language: 'typescript',
            starterCode: `// 0-to-1 Platform Core Engine
export const PlatformConfig = {
  service: "${query} Cloud Platform",
  tier: "Enterprise Tier-1",
  status: "LIVE_ACTIVE",
  metrics: { latencyMs: 1.2, uptime: "99.99%" }
};`,
            validationCriteria: ['Complete functional integration', 'Sub-second API response time', 'Secure authentication & billing'],
          },
          salaryRange: '$0 - $120,000 + Equity',
          first30DaysPlan: [
            'Day 1-7: Conduct 20 customer discovery interviews with target buyers.',
            'Day 8-20: Build landing page, clickable prototype, and collect waitlist signups.',
            'Day 21-30: Ship MVP to first batch of 5 beta testers.',
          ],
          skillGapAnalysis: {
            criticalGaps: ['Go-to-market distribution channels', 'Founder-led enterprise sales'],
            prerequisites: ['Strong execution speed and domain insight'],
            marketDemand: 'Hypergrowth',
          },
          isCompleted: false,
        },
      ],
    },
  ];

  return {
    careerId: slug,
    careerTitle: query,
    category,
    iconName: 'Sparkles',
    tagline: `Accelerate Your Global Career as a ${query}`,
    overview: defaultOverview,
    globalMarketOutlook: `Strong global demand driven by modernization, high-value technical integration, and international talent deficits in ${query}.`,
    avgStartingSalary: avgStart,
    avgSeniorSalary: avgSenior,
    topHiringCompanies: companies,
    isLiveSynthesized: true,
    liveDataSource: liveSource || 'Futuris Dynamic Intelligence API',
    liveDataTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    futures,
  };
}

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp_1',
    title: 'AI Global Builders Hackathon 2026',
    organization: 'OpenAI & MLH',
    type: 'Hackathon',
    location: 'Remote',
    deadline: 'In 4 Days (Oct 12, 2026)',
    prizeOrStipend: '$75,000 in Prizes + YC Fast-track',
    tags: ['AI Agents', 'LLMs', 'PyTorch', 'Web3 / APIs'],
    experienceLevel: 'All Levels',
    link: 'https://mlh.io',
    status: 'saved',
    description: 'Build autonomous multimodal AI agents that solve real-world industry bottlenecks. Sponsored by top AI research labs with investor demo day.',
  },
  {
    id: 'opp_2',
    title: 'Google DeepMind Research Internship (Summer)',
    organization: 'Google DeepMind',
    type: 'Internship',
    location: 'Hybrid',
    deadline: 'In 12 Days (Oct 20, 2026)',
    prizeOrStipend: '$10,500 / month + Housing',
    tags: ['Reinforcement Learning', 'JAX', 'Neural Architecture', 'Algorithms'],
    experienceLevel: 'Undergraduate',
    link: 'https://deepmind.google/careers',
    status: 'applied',
    description: 'Collaborate with world-renowned AI scientists on frontier transformer scaling, mechanistic interpretability, and multimodal reasoning.',
  },
  {
    id: 'opp_3',
    title: 'Stripe Software Engineer - Core Infrastructure',
    organization: 'Stripe',
    type: 'Full-Time Job',
    location: 'Remote',
    deadline: 'Rolling Applications',
    prizeOrStipend: '$175,000 - $245,000 + Equity',
    tags: ['Distributed Systems', 'TypeScript', 'Go', 'High Availability'],
    experienceLevel: '1-3 Years',
    link: 'https://stripe.com/jobs',
    status: 'interviewing',
    description: 'Design payment rails moving trillions of dollars globally. Build high-concurrency event processing engines with 99.999% uptime guarantees.',
  },
  {
    id: 'opp_4',
    title: 'NVIDIA Graduate AI Fellowship',
    organization: 'NVIDIA Research',
    type: 'Fellowship',
    location: 'Remote',
    deadline: 'In 18 Days (Oct 26, 2026)',
    prizeOrStipend: '$60,000 Grant + H100 GPU Compute Cluster Access',
    tags: ['CUDA', 'Accelerated Computing', 'Deep Learning', 'PyTorch'],
    experienceLevel: 'All Levels',
    link: 'https://nvidia.com/fellowships',
    status: 'not_applied',
    description: 'Prestigious global grant providing direct mentorship from NVIDIA Distinguished Scientists and 50,000 H100 GPU compute hours.',
  },
  {
    id: 'opp_5',
    title: 'NASA Space Apps Challenge: Autonomous Mars Rover Nav',
    organization: 'NASA & Space Apps',
    type: 'Grant / Contest',
    location: 'Remote',
    deadline: 'In 8 Days (Oct 16, 2026)',
    prizeOrStipend: '$35,000 Seed Grant + Kennedy Space Center Tour',
    tags: ['Robotics', 'Computer Vision', 'ROS2', 'SLAM'],
    experienceLevel: 'All Levels',
    link: 'https://spaceappschallenge.org',
    status: 'saved',
    description: 'Develop lightweight SLAM navigation algorithms capable of operating in low-light Martian crater simulations with sub-10W power budgets.',
  },
];

export const SAMPLE_MICRO_CHALLENGES: MicroChallenge[] = [
  {
    id: 'mc_1',
    title: 'Two Sum Vector Matching (AI Embedding Matrix)',
    role: 'AI & Full-Stack Engineer',
    difficulty: 'Easy',
    xpReward: 150,
    timeLimitMinutes: 15,
    prompt: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Must achieve O(n) time complexity using a Hash Map.',
    language: 'javascript',
    starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    hints: [
      'Store each number and its index in a hash map as you iterate.',
      'Check if (target - current_num) already exists in the map.',
    ],
    testCases: [
      { input: 'twoSum([2, 7, 11, 15], 9)', expectedOutput: '[0, 1]', description: 'Basic matching pair' },
      { input: 'twoSum([3, 2, 4], 6)', expectedOutput: '[1, 2]', description: 'Non-zero indexed pair' },
      { input: 'twoSum([3, 3], 6)', expectedOutput: '[0, 1]', description: 'Duplicate elements' },
    ],
    completed: false,
  },
  {
    id: 'mc_2',
    title: 'Fast Rate-Limiter Token Bucket Algorithm',
    role: 'Backend & Cloud Engineer',
    difficulty: 'Medium',
    xpReward: 250,
    timeLimitMinutes: 25,
    prompt: 'Implement a TokenBucket rate limiter class. Refill `refillRate` tokens per second up to `capacity`. `allowRequest()` should return true if a token was consumed, otherwise false.',
    language: 'javascript',
    starterCode: `class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + (elapsedSeconds * this.refillRate));
    this.lastRefill = now;
  }

  allowRequest(cost = 1) {
    this.refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    return false;
  }
}`,
    hints: [
      'Calculate time elapsed since last request to calculate added tokens.',
      'Clamp the total tokens to capacity so it does not overflow.',
    ],
    testCases: [
      { input: 'const tb = new TokenBucket(5, 1); tb.allowRequest(1)', expectedOutput: 'true', description: 'Allows request when tokens available' },
      { input: 'const tb = new TokenBucket(1, 0); tb.allowRequest(1); tb.allowRequest(1)', expectedOutput: 'false', description: 'Rejects when tokens exhausted' },
    ],
    completed: false,
  },
];
