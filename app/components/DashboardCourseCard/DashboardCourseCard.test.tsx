import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardCourseCard from "./DashboardCourseCard";

const mockCourse = {
  id: 1,
  title: "Curso de Origami Avançado",
  description: "Aprenda dobras complexas e tsurus voadores.",
  duration: 120,
  imageUrl: "http://exemplo.com/imagem.jpg",
  status: true,
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("DashboardCourseCard Component", () => {
  test("deve renderizar as informações do curso corretamente", () => {
    render(
      <DashboardCourseCard
        course={mockCourse}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Curso de Origami Avançado")).toBeInTheDocument();

    expect(screen.getByText("Duração: 120 min")).toBeInTheDocument();

    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  test("deve chamar a função onEdit quando o botão Editar for clicado", () => {
    render(
      <DashboardCourseCard
        course={mockCourse}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByText("Editar");

    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockCourse);
  });

  // Teste 3: Lógica Visual (CSS condicional)
  test('deve exibir status "Inativo" com a classe correta quando status for false', () => {
    const inactiveCourse = { ...mockCourse, status: false };

    render(
      <DashboardCourseCard
        course={inactiveCourse}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const statusBadge = screen.getByText("Inativo");

    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("dashboard-course-card__status--inactive");
  });
});
