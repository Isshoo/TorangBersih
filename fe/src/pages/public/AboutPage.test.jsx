import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "./AboutPage";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe("AboutPage", () => {
  it("merender banner CTA dengan teks dan tombol/link yang benar", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/ingin bergabung/i)).toBeInTheDocument();
    const daftarLink = screen.getByRole("link", { name: /daftar sekarang/i });
    expect(daftarLink).toBeInTheDocument();
    expect(daftarLink).toHaveAttribute("href", "/register");

    const edukasiLink = screen.getByRole("link", { name: /pelajari edukasi/i });
    expect(edukasiLink).toBeInTheDocument();
    expect(edukasiLink).toHaveAttribute("href", "/artikel");
  });
});
