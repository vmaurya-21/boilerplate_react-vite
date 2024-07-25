// RequireAuth.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RequireNotAuth } from "../components/RequireAuth"; // Adjust import paths as necessary
import { vi, describe, it, expect, beforeEach } from "vitest";
import useAuth from "../hooks/auth/useAuth";
import { AuthProvider } from "../contexts/AuthProvider";
// import useLogout from "../hooks/auth/useLogout";
// import { jwtDecode } from "jwt-decode";
import { Login } from "../pages/LoginSystem/login";
import { Home } from "../pages/Home";
//import { createMemoryHistory } from 'history';
// import { Navigate } from 'react-router-dom';

// Mocking necessary hooks and modules
vi.mock("../hooks/auth/useAuth", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../hooks/auth/useLogout", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("jwtDecode", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("../pages/Error/index", () => ({
  __esModule: true,
  Error: vi.fn(() => <div>Error Page</div>),
}));

// Mock implementations
const mockUseAuth = useAuth; //as vi.Mock;
//const mockUseLogout = useLogout; //as vi.Mock;
//const mockJwtDecode = jwtDecode; // as vi.Mock;

// describe("RequireAuth Component", () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     vi.clearAllMocks();
//   });

//   it("renders child components if the user has a valid role", () => {
//     // Mock user with valid accessToken and roles
//     mockUseAuth.mockReturnValue({
//       auth: { accessToken: "valid-token", username: "user", roles: ["admin"] },
//     });
//     mockJwtDecode.mockReturnValue({ Role: "admin" });
//     mockUseLogout.mockReturnValue(vi.fn());

//     render(
//       <AuthProvider>
//         <MemoryRouter initialEntries={["/protected"]}>
//           <Routes>
//             <Route
//               path="/protected"
//               element={
//                 <RequireAuth allowedRoles={["user", "admin"]}>
//                   <div>Protected Content</div>
//                 </RequireAuth>
//               }
//             />
//             <Route path="/403" element={<Error code="403" />} />
//           </Routes>
//         </MemoryRouter>
//       </AuthProvider>
//     );

//     expect(screen.getByText("Protected Content")).toBeInTheDocument();
//     expect(screen.queryByText("Error Page")).toBeNull();
//   });

//   it('shows error page if the user does not have a valid role', () => {
//     // Mock user with valid accessToken but not having the correct role
//     mockUseAuth.mockReturnValue({
//       auth: { accessToken: 'valid-token', username: 'user' },
//     });
//     mockJwtDecode.mockReturnValue({ Role: 'user' });
//     mockUseLogout.mockReturnValue(vi.fn());

//     render(
//       <MemoryRouter initialEntries={['/protected']}>
//         <Routes>
//           <Route
//             path="/protected"
//             element={
//               <RequireAuth allowedRoles={['admin']}>
//                 <div>Protected Content</div>
//               </RequireAuth>
//             }
//           />
//           <Route path="/403" element={<Error code="403" />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.queryByText('Protected Content')).toBeNull();
//     expect(screen.getByText('Error Page')).toBeInTheDocument();
//   });

//   it('logs out if no access token is present', () => {
//     // Mock user without accessToken
//     mockUseAuth.mockReturnValue({
//       auth: { accessToken: null, username: 'user' },
//     });
//     mockUseLogout.mockImplementation(() => {
//       // Capture call to logout function
//       expect(mockUseLogout).toHaveBeenCalled();
//     });
//     mockJwtDecode.mockReturnValue({ Role: '' });

//     render(
//       <MemoryRouter initialEntries={['/protected']}>
//         <Routes>
//           <Route
//             path="/protected"
//             element={
//               <RequireAuth allowedRoles={['admin']}>
//                 <div>Protected Content</div>
//               </RequireAuth>
//             }
//           />
//           <Route path="/403" element={<Error code="403" />} />
//         </Routes>
//       </MemoryRouter>
//     );
//   });
// });

describe("RequireNotAuth Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("redirects authenticated users to home", () => {
    // Mock user as authenticated
    mockUseAuth.mockReturnValue({
      auth: { username: "user" },
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<RequireNotAuth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    // The expectation is to find the text from the Home component
    expect(screen.getByText("Hello world..")).toBeInTheDocument();
  });

  it("renders child components if the user is not authenticated", () => {
    // Mock user as not authenticated
    mockUseAuth.mockReturnValue({
      auth: {},
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          {/* <Router> */}
          <Routes>
            <Route element={<RequireNotAuth />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
          {/* </Router> */}
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
