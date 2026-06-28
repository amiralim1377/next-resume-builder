# CustomCalendar - Month and Year Selection

## Overview
The CustomCalendar component now supports three view modes:
- **Day View**: Default calendar view showing days of the month
- **Month View**: Grid of 12 months for quick month selection
- **Year View**: Grid of 12 years for quick year selection

## Features

### 1. Clickable Header
Click on the calendar header title to navigate between views:
- Click on "Month Year" (e.g., "January 2024") → Shows Month View
- Click on "Year" (e.g., "2024") → Shows Year View

### 2. Month Selection
When in Month View:
- Displays all 12 months in a 3x4 grid
- Click any month to select it and return to Day View
- Use arrow buttons to navigate between years
- Current month is highlighted
- Selected month (if exists) is highlighted with brand color

### 3. Year Selection
When in Year View:
- Displays 12 years in a 3x4 grid (e.g., 2020-2031)
- Click any year to select it and switch to Month View
- Use arrow buttons to navigate 12 years forward/backward
- Current year is highlighted
- Selected year (if exists) is highlighted with brand color

## Usage

```tsx
import { Calendar } from "@/components/ui/CustomCalendar";

function MyComponent() {
  return (
    <Calendar 
      value={selectedDate}
      onChange={handleDateChange}
      calendarSystem="gregorian"
    >
      <Calendar.Header />
      <Calendar.Content />
    </Calendar>
  );
}
```

## Components

### Calendar.Content
Automatically renders the appropriate view based on the current state:
- Day View: Shows CalendarGrid
- Month View: Shows MonthPicker
- Year View: Shows YearPicker

### Calendar.Header
- Displays current view title (clickable)
- Navigation arrows (left/right)
- Handles view mode transitions

## Navigation

### Arrow Buttons
- **Day View**: Navigate months (previous/next month)
- **Month View**: Navigate years (previous/next year)
- **Year View**: Navigate year ranges (previous/next 12 years)

### RTL Support
Arrow button behavior is automatically reversed for RTL languages (Persian).

## State Management

The calendar state includes:
- `view`: Current view mode ("day" | "month" | "year")
- `currentMonth`: Currently displayed month/year
- `selectedDate`: User's selected date

## Example Flow

1. User sees "January 2024" in Day View
2. User clicks "January 2024" → Switches to Month View showing "2024"
3. User clicks "2024" → Switches to Year View showing "2020-2031"
4. User selects "2025" → Switches back to Month View showing "2025"
5. User selects "March" → Switches back to Day View showing "March 2025"
