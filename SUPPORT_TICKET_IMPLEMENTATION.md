# Support Ticket Details Page - Implementation Summary

## Overview
Created a specialized ticket details page for the SUPPORT role with restricted permissions and specific capabilities.

## Files Created

### 1. [src/components/StatusSelector.tsx](src/components/StatusSelector.tsx)
A new reusable component for changing ticket status with the following features:
- Dropdown selector for available statuses
- Visual indicators with status colors
- PATCH request to update ticket status
- Error handling and loading states
- Callback handlers for parent component updates

**Key Features:**
- Uses `useStatuses()` hook to fetch available statuses
- Implements PATCH request with format: `PATCH /api/tickets/{ticketId}` with body `{ status_id: newStatusId }`
- Integrated error handling and loading states

### 2. [src/pages/Support/SupportTicketDetailsPage.tsx](src/pages/Support/SupportTicketDetailsPage.tsx)
A specialized ticket details page for SUPPORT agents with the following features:

**Restrictions:**
- ❌ Cannot change priority (displayed as read-only text)
- ✅ Can assign ticket to themselves
- ✅ Can change ticket status

**Key Features:**
- Displays priority as read-only text (no selector)
- Implements "Assign to Me" button:
  - Only visible if ticket is not already assigned to current user
  - Uses PATCH request: `PATCH /api/tickets/{ticketId}` with body `{ "assignedUserId": user.id }`
  - Shows loading state and error messages
- Full status selector (StatusSelector component)
- All other ticket details (conversations, messages, dates, etc.)
- Proper error handling and loading states

**Route Added:**
`/support/ticket/:id` - Accessible for SUPPORT role users

## Implementation Details

### API Endpoints Used
1. **GET** `/api/tickets/{ticketId}` - Fetch ticket details and messages
2. **PATCH** `/api/tickets/{ticketId}` - Update ticket (status or assignment)
   - Body: `{ "assignedUserId": userId }` or `{ "status_id": statusId }`

### Components & Hooks Used
- `useAuth()` - For apiClient to make requests
- `useUser()` - To get current user info
- `useStatuses()` - To fetch available statuses
- `usePriorities()` - To display priority info (read-only)
- `StatusSelector` - New component for status changes
- `AssignedChip` - Display assigned user
- `Conversation` & `AddMessage` - For ticket communication

### State Management
- `ticket` - Current ticket data
- `messages` - Conversation messages
- `loading` - Loading state for initial data fetch
- `error` - Error state for data fetch
- `assigningToSelf` - Loading state for assign operation
- `assignError` - Error state for assign operation

## Usage

To navigate to a support ticket:
```
/support/ticket/{ticketId}
```

Example: `/support/ticket/123`

## Security Notes
- Priority field is read-only for SUPPORT agents
- Assign button only shows when ticket is not already assigned to current user
- All API requests are authenticated via the apiClient with bearer tokens
- Error handling prevents invalid operations from completing
