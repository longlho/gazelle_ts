// Top-level app: pulls in both internal packages + npm deps. Demonstrates
// project references resolving across deeply nested packages.
import React from 'react';
import { FormattedDate } from 'react-intl';
import { canViewUsers } from '#apps/web/lib/auth/permissions.js';
import { isAdmin, type User } from '#packages/core/types.js';
import { newest } from '#packages/utils/format.js';

export interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps): React.ReactElement {
  const latest = newest(users);
  if (!canViewUsers()) {
    return <p>not allowed</p>;
  }
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          {u.email}
          {isAdmin(u) ? ' (admin)' : ''} —{' '}
          <FormattedDate value={u.registered} dateStyle="medium" />
        </li>
      ))}
      {latest && <li>latest: {latest.email}</li>}
    </ul>
  );
}
