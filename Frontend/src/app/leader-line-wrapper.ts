import LeaderLine from 'leader-line-new';

// Declare the missing types
declare global {
  interface SVGPathElement {
    setPathData?(pathData: SVGPathSegment[]): void;
  }

  interface SVGPathSegment {
    type: string; // Use string instead of number
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    r1?: number;
    r2?: number;
    angle?: number;
    largeArcFlag?: number;
    sweepFlag?: number;
  }
}

// Store the original setPathData method (if it exists)
const originalSetPathData = SVGPathElement.prototype.setPathData;

// Override the setPathData method only for LeaderLine
SVGPathElement.prototype.setPathData = function (pathData: SVGPathSegment[]) {
  // Check if this is a LeaderLine path element using a custom attribute
  if (this.getAttribute('data-leader-line') === 'true') {
    let pathString = '';
    pathData.forEach((segment) => {
      switch (segment.type) {
        case 'M': // MOVETO_ABS
          pathString += `M${segment.x},${segment.y} `;
          break;
        case 'L': // LINETO_ABS
          pathString += `L${segment.x},${segment.y} `;
          break;
        case 'C': // CURVETO_CUBIC_ABS
          pathString += `C${segment.x1},${segment.y1} ${segment.x2},${segment.y2} ${segment.x},${segment.y} `;
          break;
        case 'A': // ARCTO_ABS
          pathString += `A${segment.r1},${segment.r2} ${segment.angle} ${segment.largeArcFlag},${segment.sweepFlag} ${segment.x},${segment.y} `;
          break;
        // Add more cases as needed
        default:
          console.warn('Unsupported path segment type:', segment.type);
      }
    });
    this.setAttribute('d', pathString.trim());
  } else {
    // Call the original setPathData method for non-LeaderLine elements
    if (originalSetPathData) {
      originalSetPathData.call(this, pathData);
    } else {
      console.warn('setPathData is not supported in this browser.');
    }
  }
};

// Export the modified LeaderLine
export default LeaderLine;
