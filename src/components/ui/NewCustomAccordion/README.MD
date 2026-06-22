# @your-repo/custom-accordion

A production-grade, highly optimized Accordion primitive built natively for **React 19**, **Tailwind CSS**, and **Framer Motion**.

This component features the architectural design patterns, type-safety, and deep keyboard accessibility of premium headless libraries like Radix UI, but is written completely from scratch to eliminate external UI library bundle overhead.

---

## 1. Component Overview

The Custom Accordion is a robust disclosure component that allows users to show or hide collapsible content sections. It is designed to be a highly customizable design system primitive that balances accessibility, fluid layout animations, and developer experience.

### Purpose & Use Cases

- **Frequently Asked Questions (FAQs):** Consolidate dense informational areas while keeping the UI clean and digestible.
- **Complex Dashboards & Control Panels:** Group system configurations, filter groups, or account management settings seamlessly.
- **Sequential Workflows & Wizards:** Use controlled state architectures to guide users step-by-step through configuration processes.
- **Zero-Bloat Engineering:** Built entirely as a custom local component suite, giving you 100% control over the source code, layout styles, and animation presets.

---

## 2. Features

- ⚛️ **React 19 Native Ref Handling:** Bypasses legacy `React.forwardRef` boilerplate. Elements consume `ref` directly as a standard prop.
- 🔀 **Discriminated Union Types:** Strictly enforces type safety between `"single"` and `"multiple"` structural modes. TypeScript will instantly catch array inputs in single mode or string inputs in multiple mode.
- 🎛️ **Controlled & Uncontrolled Architectures:** Easily manage open states automatically via `defaultValue` or manually hook into application state via `value` and `onValueChange`.
- ♿ **WAI-ARIA Compliance:** Includes automatic structural linking via dynamic `aria-controls` and `aria-labelledby`, toggle mapping with `aria-expanded`, and intuitive semantic key bindings.
- ⌨️ **Circular Keyboard Navigation:** Includes container-level keyboard event routing. Users can traverse trigger items with `ArrowDown` and `ArrowUp`, or skip directly to boundaries using `Home` and `End`.
- ✨ **Jank-Free Dynamic Animation:** Powered by Framer Motion's height transitions. Layout components isolate structural margin/padding to eliminate layout jumps when collapsing elements dynamically.
- 🎨 **Tailwind State Selectors:** Elements expose native state hooks (`data-state="open | closed"` and `data-disabled`), allowing for conditional styling using clean, class-based modifiers.

---

## 3. Installation & Requirements

### Peer Dependencies

Ensure the following packages are installed in your project workspace:

```bash
npm install framer-motion lucide-react
```

### Required Style Utility

This component requires a class-merging utility (combining `clsx` and `tailwind-merge`) located at your project's alias configuration path (e.g., `@/utils/cn`):

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 4. Folder Structure

To manage compound state dependencies and avoid circular reference compilation loops, the component suite is split across five isolated files within a dedicated workspace directory:

```text
src/components/ui/accordion/
├── context.ts             # Context boundaries, global types, and state hooks
├── accordion-root.tsx     # <Accordion /> element & keyboard navigation router
├── accordion-item.tsx     # <AccordionItem /> individual scope boundary
├── accordion-trigger.tsx  # <AccordionTrigger /> interactive semantic button
├── accordion-content.tsx  # <AccordionContent /> Framer Motion panel wrapper
└── index.ts               # Clean public barrel exports
```

### File Responsibilities

- **`context.ts`**: Centralized hub for TypeScript definitions, sub-contexts, and customized layout custom hooks (`useAccordion`, `useAccordionItem`). This decouples sub-components and allows them to hook into shared states independently.
- **`accordion-root.tsx`**: Orchestrates state logic, discriminates user configuration props, and acts as the keyboard listener to handle layout focus routing.
- **`accordion-item.tsx`**: Sets descriptive `data-state` DOM properties and supplies unique React 19 `useId` strings down to triggers and content views.
- **`accordion-trigger.tsx`**: Renders the toggle button, modifies ARIA visibility trees, and houses action-click listeners.
- **`accordion-content.tsx`**: Manages structural layout masks, controls Framer Motion height/opacity variants, and features a type patch preventing conflicts between Framer Motion node evaluations and translation tools like `react-i18next`.

---

## 5. Basic Usage

Import the entire compound ecosystem from the directory index file:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function App() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the refund policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee on all standard tiers.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Enterprise SLA Addendum</AccordionTrigger>
        <AccordionContent>
          This section is locked or unavailable under your current tier
          permissions.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How can I scale my team seats?</AccordionTrigger>
        <AccordionContent>
          Navigate straight to your profile dashboard to request on-demand
          seats.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

---

## 6. Advanced Usage Configurations

### Multi-Panel Active Configuration

Setting `type="multiple"` transforms `defaultValue` and `value` expectations into a strict `string[]` signature, allowing multiple views to remain open concurrently.

```tsx
export function MultipleAccordionExample() {
  return (
    <Accordion type="multiple" defaultValue={["panel-logs", "panel-metrics"]}>
      <AccordionItem value="panel-logs">
        <AccordionTrigger>Real-time Console Logs</AccordionTrigger>
        <AccordionContent>
          System stream pipelines are healthy.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="panel-metrics">
        <AccordionTrigger>Performance Ingestion Metrics</AccordionTrigger>
        <AccordionContent>
          P99 response thresholds remain under 45ms.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Fully Controlled Implementation

Sync accordion state transitions directly with query routing strings or external state machines.

```tsx
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function ControlledExample() {
  const [activeStep, setActiveStep] = useState<string>("step-1");

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold">
        Active State Track: {activeStep}
      </div>

      <Accordion type="single" value={activeStep} onValueChange={setActiveStep}>
        <AccordionItem value="step-1">
          <AccordionTrigger>Step 1: Link Repositories</AccordionTrigger>
          <AccordionContent>
            Repository syncing configurations...
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-2">
          <AccordionTrigger>Step 2: Environment Variables</AccordionTrigger>
          <AccordionContent>
            Inject runtime configuration strings here.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

---

## 7. Custom Styling & Animation Hooks

Every element exposes native `data-*` attributes that allow you to style states without passing custom boolean props down the component tree. You can target these directly with Tailwind:

```tsx
// Example: Rotate an alternative icon configuration or change background on expansion
<AccordionItem
  value="item-1"
  className="transition-colors data-[disabled]:opacity-40 data-[state=open]:bg-slate-50"
>
  <AccordionTrigger className="[&[data-state=open]>svg]:text-indigo-600">
    Styling Hook Example
  </AccordionTrigger>
  <AccordionContent>Content element.</AccordionContent>
</AccordionItem>
```
