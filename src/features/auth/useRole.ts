import { useUser } from "../user/UserContext";
import type { Role } from "../user/user.types";

export function useRole() {
  const { user } = useUser();

  console.log("[useRole] user:", user);

  const hasRole = (role: Role) => {
    const result = user?.roles?.includes(role);
    console.log(`[useRole] hasRole(${role}):`, result);
    return result;
  };

  const isUser = hasRole("USER");
  const isAgent = hasRole("AGENT");
  const isAdmin = hasRole("ADMIN");
  const isVisitor = !user || user.roles?.includes("VISITOR");

  console.log("[useRole] isUser:", isUser);
  console.log("[useRole] isAgent:", isAgent);
  console.log("[useRole] isAdmin:", isAdmin);
  console.log("[useRole] isVisitor:", isVisitor);

  return {
    isUser,
    isAgent,
    isAdmin,
    isVisitor,
    hasRole,
  };
}