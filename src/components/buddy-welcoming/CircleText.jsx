import './CircleText.css';

const CircleText = ({ text }) => {
    const lines = text.split("\n");

    return (
        <div className="circle-container">
            {lines.map((line, index) => {
                const totalLines = lines.length;
                // Calculate indent and width for every line
                // const scale = ;
                const indentation = Math.sin(Math.PI * (index / (totalLines - 1)))
                // scale * 40; // can be adjusted
                const width = indentation * 60 + 40 ; // maximize with 80 and minimal 20

                return (
                    <p
                        key={index}
                        style={{
                            textIndent: `${indentation}px`, // Dynamic indent
                            width: `${width}%`, // Dynamic width (percentage container width)
                            margin: "0 auto", // keep text centered
                        }}
                    >
                        {line}
                    </p>
                );
            })}
        </div>
    );
};

export default CircleText;