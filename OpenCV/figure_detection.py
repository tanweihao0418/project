import cv2

video=cv2.VideoCapture(0)
cascade= cv2.CascadeClassifier("haarcascade_upperbody.xml")

while True:
    check, frame = video.read()
    gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)

    faceRects = cascade.detectMultiScale(
        gray, scaleFactor=1.05, minNeighbors=5)

    for (x, y, w, h) in faceRects:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 3)



    cv2.imshow("Detection",frame)

    key=cv2.waitKey(1)

    if key==ord('q'):
        if status==1:
            times.append(datetime.now())
        break


video.release()
cv2.destroyAllWindows
