import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserData() {
  const { user, isAuthenticated, isLoading: authLoading, accessToken } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      console.log('🔍 UserData page mounted - fetching fresh user data from /api/user');
      setIsFetching(true);
      setFetchError(null);

      axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('✅ Fresh user data received:', response.data);
          setFetchedUser(response.data);
        })
        .catch(error => {
          console.error('❌ Error fetching user data:', error?.response?.data ?? error);
          setFetchError(error?.response?.data?.message || 'Failed to fetch user data');
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isAuthenticated, accessToken]);

  const displayUser = fetchedUser || user;

  if (authLoading || isFetching) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col justify-center w-full px-6 sm:px-6 lg:px-8">
          <div className="w-105 mx-auto">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !displayUser) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col justify-center w-full px-6 sm:px-6 lg:px-8">
          <div className="w-105 mx-auto">
            <h2 className="text-center text-3xl font-extrabold mb-8 text-gray-900">
              User Data
            </h2>
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">You are not logged in. Please login first.</p>
              </div>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="flex flex-col justify-center w-full px-6 sm:px-6 lg:px-8">
        <div className="w-105 mx-auto">
          <h2 className="text-center text-3xl font-extrabold mb-8 text-gray-900">
            User Data
          </h2>

          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {fetchError && (
              <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">{fetchError}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID
                </label>
                <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 sm:text-sm">
                  {displayUser.id}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 sm:text-sm">
                  {displayUser.name}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 sm:text-sm">
                  {displayUser.email}
                </div>
              </div>

              {/* Roles */}
              {displayUser.roles && displayUser.roles.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roles
                  </label>
                  <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md sm:text-sm">
                    <div className="flex flex-wrap gap-2">
                      {displayUser.roles.map((role, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Created At */}
              {displayUser.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Created At
                  </label>
                  <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 sm:text-sm">
                    {new Date(displayUser.createdAt).toLocaleString()}
                  </div>
                </div>
              )}

              {/* Updated At */}
              {displayUser.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Updated At
                  </label>
                  <div className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 sm:text-sm">
                    {new Date(displayUser.updatedAt).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
