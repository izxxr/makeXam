#let exam = json(bytes(sys.inputs.exam))

// Page setup
#let include_branding = exam.at("include_branding", default: true)
#let include_page_numbers = exam.at("page_numbers", default: true)
#let front_page_format = exam.at("front_page_format", default: false)

// Header Configuration
#let title = exam.at("title", default: "")
#let subtitle = exam.at("subtitle", default: "")
#let input_fields = exam.at("input_fields", default: ())

// Instructions
#let instructions = exam.at("instructions", default: ())
#let instructions_header = exam.at("instructions_header", default: "Instructions")

// Grading Table
#let include_grading_table = exam.at("include_grading_table", default: false)

// Questions
#let questions = exam.at("questions", default: ())


// ------------------- PAGE SETUP ------------------------- //
#set text(
  font: "New Computer Modern"
)

#set page(
  footer: [
    #if include_branding {
      text("Generated using makeXam", size: 8pt)
    }
    #h(1fr)
    #if include_page_numbers {
      context {
        if counter(page).get().at(0) != 1 {
          counter(page).display()
        } 
      }
    }
  ]
)

// ------------------- HEADER ------------------------- //
#align([= #title], center)
#align([== #subtitle], center)
#linebreak()
#align(
    grid(
    ..for input in input_fields {
      let ipt_content = stack(
        text(input, weight: "bold"),
        dir: ltr,
        line(length: 100pt, stroke: 0.5pt, start: (8pt, 7pt)),
      )
      (ipt_content,)
    },
    columns: 2,
    column-gutter: (1fr, 1fr),
    row-gutter: 20pt,
    align: right
  ),
  center,
)
#linebreak()

// ------------------- INSTRUCTIONS ------------------------- //
#if instructions.len() != 0 {
  [
    === #underline(instructions_header)
    #pad(enum(..instructions), top: 4pt)
  ]
}

// ------------------- GRADING TABLE ------------------------ //
#if include_grading_table {
  linebreak()
  align(
      figure(
        table(
        columns: (60pt,) + (30pt,) * questions.len() + (40pt,),
        rows: (20pt, 20pt),
        [*Question*],
        ..for qs_no in range(1, questions.len() + 1) {
          (text(str(qs_no), weight: "bold"),)
        },
        [*Total*],
        [*Marks*]
      )
    ),
    if front_page_format { horizon } else { center },
  )
}

// #pad(align(line(stroke: (dash: "dashed"), length: 30%), center), top: 15pt)
#linebreak()

#if front_page_format {
  pagebreak()
}

// ------------------- QUESTIONS ------------------------- //
#enum(
  ..for qs in questions {
    let qs_content = eval(qs.text, mode: "markup")

    if qs.at("marks", default: none) != none {
      qs_content += h(1fr) + "[" + str(qs.marks) + "]"
    }

    if qs.at("working_space", default: none) != none {
      qs_content += linebreak() * qs.working_space;
    }

    if qs.at("choices", default: none) != none {
      qs_content += "\n"
      let numbering_idx = 1;

      for (idx, choice) in qs.choices.enumerate() {
        if choice == 0 {
          qs_content += linebreak()
        } else {
          qs_content += text(numbering("(A)", numbering_idx) + " ", weight: "bold")
          qs_content += eval(choice, mode: "markup") + h(1fr);
          numbering_idx += 1
        }
      }

      qs_content += "\n\n"
    }

    (qs_content,)
  },
  numbering: (it) => {
    return text("Q" + str(it) + ".", weight: "bold")
  }
)
