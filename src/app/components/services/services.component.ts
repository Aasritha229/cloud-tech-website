import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pillar { id: string; icon: string; title: string; description: string; }
interface OrgItem { title: string; open: boolean; content: string; }

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  activeView: 'delivery' | 'region' = 'delivery';

  pillars: Pillar[] = [
    {
      id: '1', icon: '🖥️', title: 'Onboarding',
      description: 'Automated onboarding of workloads hosted with Infra as code approach. Automated validation of workloads to monitor any associated drifts to control cost.',
    },
    {
      id: '2', icon: '📈', title: 'Observability',
      description: "Ability to effectively infer internal states of the system based on the system's external output, achieved through instrumentations that includes log, metrics, tracing, integrated tools, reports & trend analysis.",
    },
    {
      id: '3', icon: '⚙️', title: 'Compliance',
      description: "Native framework enables DXC's customer to achieve compliance in the area of backup and security. Zero Touch automation enhances end to end experience & drives compliance actions seamlessly.",
    },
    {
      id: '4', icon: '🤖', title: 'Automation',
      description: "Automation Services enable DXC's customers to achieve and enhance business outcomes through standardized, intelligent, and innovative automation solutions in a cost-effective way.",
    },
    {
      id: '5', icon: '💰', title: 'FinOps',
      description: 'Drive better business outcomes by analyzing and optimizing cloud spend, to make informed decisions, minimizing waste, and maximizing profits.',
    },
  ];

  orgItems: OrgItem[] = [
    {
      title: 'Public Cloud GDN India',
      open: false,
      content: 'Details about Public Cloud GDN India delivery organization and structure.',
    },
    {
      title: 'Public Cloud GDN India Cloud Operational Excellence',
      open: false,
      content: 'Details about Cloud Operational Excellence metrics and initiatives within Public Cloud GDN India.',
    },
  ];

  toggleOrg(item: OrgItem): void {
    item.open = !item.open;
  }
}
