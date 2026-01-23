import { useAuth } from '../context/AuthContext';

export default function UserData() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">User Data</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">User Data</h1>
        <p className="text-red-600">You are not logged in. Please login first.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Data</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-2xl">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application data.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            {user.role && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.role}
                </dd>
              </div>
            )}
            {user.roles && user.roles.length > 0 && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Roles</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((role, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            )}
            {user.createdAt && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.createdAt).toLocaleString()}
                </dd>
              </div>
            )}
            {user.updatedAt && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.updatedAt).toLocaleString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
