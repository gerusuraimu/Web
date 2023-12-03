window.onload = function() {
    let draggedPiece = null;
    let offsetX = 0;
    let offsetY = 0;
    let currentZIndex = 0;

    const correctPositions = [
        { x: 819, y: 791, offsetX: 48, offsetY: 48, radius: 25 }, //aichi
        { x: 998, y: 410, offsetX: 55, offsetY: 65, radius: 25 }, //akita
        { x: 986, y: 328, offsetX: 60, offsetY: 60, radius: 25 }, //aomori
        { x: 1000, y: 741, offsetX: 55, offsetY: 55, radius: 25 }, //chiba
        { x: 796, y: 714.5, offsetX: 55, offsetY: 55, radius: 25 }, //gihu
        { x: 921, y: 671, offsetX: 50, offsetY: 50, radius: 25 }, //gummar
        { x: 976.5, y: 2.5, offsetX: 290, offsetY: 180, radius: 25 }, //hokkaido
        { x: 747, y: 727, offsetX: 50, offsetY: 50, radius: 25 }, //hukui
        { x: 966.5, y: 602.9, offsetX: 60, offsetY: 50, radius: 25 }, //hukushima
        { x: 676.6, y: 772.2, offsetX: 50, offsetY: 50, radius: 25 }, //hyogo
        { x: 997, y: 679.8, offsetX: 50, offsetY: 50, radius: 25 }, // ibaraki
        { x: 793.8, y: 611.5, offsetX: 50, offsetY: 50, radius: 25 }, //ishikawa
        { x: 1054.5, y: 414.3, offsetX: 60, offsetY: 60, radius: 25 }, //iwate
        { x: 951.5, y: 772.4, offsetX: 50, offsetY: 50, radius: 25 }, //kanagawa
        { x: 712.3, y: 764.7, offsetX: 50, offsetY: 50, radius: 25 }, //kyoto
        { x: 771.2, y: 802.7, offsetX: 50, offsetY: 50, radius: 25 }, //mie
        { x: 1031.8, y: 525.4, offsetX: 50, offsetY: 50, radius: 25 }, //miyagi
        { x: 857.8, y: 672.7, offsetX: 65, offsetY: 65, radius: 25 }, //nagano
        { x: 752.5, y: 836.6, offsetX: 50, offsetY: 50, radius: 25 }, //nara
        { x: 876.3, y: 559.3, offsetX: 75, offsetY: 75, radius: 25 }, //niigata
        { x: 726.1, y: 817.5, offsetX: 50, offsetY: 50, radius: 25 }, //osaka
        { x: 939.4, y: 728.2, offsetX: 50, offsetY: 50, radius: 25 }, //saitama
        { x: 524.1, y: 656.8, offsetX: 50, offsetY: 100, radius: 25 }, //shimane
        { x: 866.5, y: 774.4, offsetX: 50, offsetY: 50, radius: 25 }, //shizuoka
        { x: 976, y: 664.2, offsetX: 50, offsetY: 50, radius: 25 }, //tochigi
        { x: 610.8, y: 777.1, offsetX: 50, offsetY: 50, radius: 25 }, //tottori
        { x: 825.1, y: 677.1, offsetX: 50, offsetY: 50, radius: 25 }, //toyama
        { x: 720.5, y: 865.4, offsetX: 50, offsetY: 50, radius: 25 }, //wakayama
        { x: 987.4, y: 509.3, offsetX: 50, offsetY: 50, radius: 25 }, //yamagata
        { x: 471.6, y: 835.5, offsetX: 50, offsetY: 50, radius: 25 }, //yamaguchi
        { x: 908.5, y: 751, offsetX: 50, offsetY: 50, radius: 25 }, //yamanashi
        { x: 946, y: 756.2, offsetX: 50, offsetY: 100, radius: 25}, //tokyo
        { x: 572, y: 901, offsetX: 50, offsetY: 50, radius: 25}, //kochi
        { x: 546, y: 813.7, offsetX: 50, offsetY: 50, radius: 25}, //hiroshima
        { x: 618.7, y: 795.5, offsetX: 50, offsetY: 50, radius: 25}, //okayama
        { x: 544.5, y: 871, offsetX: 50, offsetY: 50, radius: 25}, //ehime
        { x: 642, y: 874.7, offsetX: 50, offsetY: 50, radius: 25}, //tokushima
        { x: 629.2, y: 852.5, offsetX: 50, offsetY: 50, radius: 25}, //kagawa
        { x: 475, y: 911, offsetX: 50, offsetY: 50, radius: 25}, //oita
        { x: 425, y: 875, offsetX: 50, offsetY: 50, radius: 25}, //hukuoka
        { x: 410.3, y: 919.5, offsetX: 50, offsetY: 50, radius: 25}, //saga
        { x: 328.2, y: 840.6, offsetX: 100, offsetY: 100, radius: 25}, //nagasaki
        { x: 422.5, y: 949.7, offsetX: 50, offsetY: 50, radius: 25}, //kumamoto
        { x: 467.3, y: 974.8, offsetX: 50, offsetY: 50, radius: 25}, //miyagi
        { x: 331.3, y: 1012.1, offsetX: 100, offsetY: 170, radius: 25}, //kagoshima
        { x: 9.3, y: 1366, offsetX: 180, offsetY: 130, radius: 25}, //okinawa
        { x: 765, y: 770, offsetX: 50, offsetY: 50, radius: 25} //shiga
    ];

    const offsetXForCheck = 250;
    const offsetYForCheck = 250;
    function isNearby(point1, point2) {
        const adjustedPoint2 = {
            x: point2.x + point2.offsetX,
            y: point2.y + point2.offsetY
        };

        const distance = Math.sqrt(Math.pow(point1.x - adjustedPoint2.x, 2) + Math.pow(point1.y - adjustedPoint2.y, 2));
        return distance <= point2.radius + 25;
    }

    const container = document.getElementById('puzzle-container');
    const pieces = [
        container.getAttribute('data-image1-url'),
        container.getAttribute('data-image2-url'),
        container.getAttribute('data-image3-url'),
        container.getAttribute('data-image4-url'),
        container.getAttribute('data-image5-url'),
        container.getAttribute('data-image6-url'),
        container.getAttribute('data-image7-url'),
        container.getAttribute('data-image8-url'),
        container.getAttribute('data-image9-url'),
        container.getAttribute('data-image10-url'),
        container.getAttribute('data-image11-url'),
        container.getAttribute('data-image12-url'),
        container.getAttribute('data-image13-url'),
        container.getAttribute('data-image14-url'),
        container.getAttribute('data-image15-url'),
        container.getAttribute('data-image16-url'),
        container.getAttribute('data-image17-url'),
        container.getAttribute('data-image18-url'),
        container.getAttribute('data-image19-url'),
        container.getAttribute('data-image20-url'),
        container.getAttribute('data-image21-url'),
        container.getAttribute('data-image22-url'),
        container.getAttribute('data-image23-url'),
        container.getAttribute('data-image24-url'),
        container.getAttribute('data-image25-url'),
        container.getAttribute('data-image26-url'),
        container.getAttribute('data-image27-url'),
        container.getAttribute('data-image28-url'),
        container.getAttribute('data-image29-url'),
        container.getAttribute('data-image30-url'),
        container.getAttribute('data-image31-url'),
        container.getAttribute('data-image32-url'),
        container.getAttribute('data-image33-url'),
        container.getAttribute('data-image34-url'),
        container.getAttribute('data-image35-url'),
        container.getAttribute('data-image36-url'),
        container.getAttribute('data-image37-url'),
        container.getAttribute('data-image38-url'),
        container.getAttribute('data-image39-url'),
        container.getAttribute('data-image40-url'),
        container.getAttribute('data-image41-url'),
        container.getAttribute('data-image42-url'),
        container.getAttribute('data-image43-url'),
        container.getAttribute('data-image44-url'),
        container.getAttribute('data-image45-url'),
        container.getAttribute('data-image46-url'),
        container.getAttribute('data-image47-url')
    ];

    pieces.forEach((path, index) => {
        const piece = document.createElement('img');
        piece.src = path;
        piece.classList.add('piece');
        piece.draggable = false;
        piece.style.position = 'absolute';
        piece.style.left = `${100 + index * 30}px`;
        piece.style.top = `${100 + index * 30}px`;
        piece.setAttribute('data-index', index);
        piece.addEventListener('mousedown', function(e) {
            draggedPiece = this;
            currentZIndex++;
            draggedPiece.style.zIndex = currentZIndex;
            const rect = draggedPiece.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        container.appendChild(piece);
    });

    function onMouseMove(e) {
        if (draggedPiece) {
            const rect = container.getBoundingClientRect();
            draggedPiece.style.left = (e.clientX - rect.left - offsetX) + 'px';
            draggedPiece.style.top = (e.clientY - rect.top - offsetY) + 'px';
        }
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (draggedPiece) {
            const rect = draggedPiece.getBoundingClientRect();
            const pieceCenter = {
                x: rect.left + (rect.width / 2),
                y: rect.top + (rect.height / 2)
            };
            const pieceIndex = parseInt(draggedPiece.getAttribute('data-index'));
            if (isNearby(pieceCenter, correctPositions[pieceIndex])) {
                draggedPiece.style.left = correctPositions[pieceIndex].x + 'px';
                draggedPiece.style.top = correctPositions[pieceIndex].y + 'px';
            }
        }
    }
}