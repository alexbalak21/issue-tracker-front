export const permissions = {
  USER: {
    changePriority: true,
    changeStatus: false,
    assignSelf: false,
    assignOthers: false,
  },
  SUPPORT: {
    changePriority: false,
    changeStatus: true,
    assignSelf: true,
    assignOthers: false,
  },
  MANAGER: {
    changePriority: true,
    changeStatus: true,
    assignSelf: true,
    assignOthers: true,
  },
  ADMIN: {
    changePriority: true,
    changeStatus: true,
    assignSelf: true,
    assignOthers: true,
  },
  VISITOR: {
    changePriority: false,
    changeStatus: false,
    assignSelf: false,
    assignOthers: false,
  },
} as const;

export type PermissionRole = keyof typeof permissions;

export function can(
  action: keyof typeof permissions["USER"],
  role: PermissionRole
) {
  return permissions[role][action];
}
