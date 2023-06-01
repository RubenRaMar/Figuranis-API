### FIGURaniS

## Data layer

### Data

- Collection of figures
  - Figures:
    - id: sting
    - title: string;
    - character: string;
    - franchise: string;
    - purchased: boolean;
    - manufacturer: string;
    - material: string;
    - size: number;
    - weight: number;
    - price: number;
    - image: string;
    - user: Types.ObjectId;
  - User:
    - id: sting
    - username: string,
    - password: string,
  - Feddback:
    - isLoading,

### Modifications

- loginUser(userData)
- getUserToken()
- logoutUser()
- removeToken()
- setToken(key, value)
- getToken(key)
- loadFigures(userId)
- loadFigure(userId, figureId)
- addFigure(figureData)
- removeFigure(figureId)
- updateFigure(figureData)
- toggleFigure()
- hideLoading()
- showLoading()
- onSubmit(data(user, figure)){Formularios}
- hidefeedback(mesagge)
- showfeedback(mesagge)
- getPages(page(number))

### App

- Receives a token from local satage
- Render layout

### Layout

- Render header
- Render the router route

### Header

- Show FIGURAniS logo
- Show Logout icon
- Renders Nav

### Nav

- Show links icons and text
- Navegation with NavLinks

### LoginPage

- Shows the title "LOGIN" inside a heading
- Renders a LoginForm
- Receives loginUser(user)
- Receives getLoginToken(token)
- Receives dispatch(ActionsCreator(userDataToken))
- Receives setToken(Key, Value);
- Vavigate("/figures");
- handleLoginSubmit()

### LoginForm

- Shows inputs username and password
- State:
  - User credentials
- Receives handleSubmit
- Renders a Button component
  - text: "LOGIN"
  - onSubmit: handleSubmit

### FiguresPage

- Shows the title "YOUR FAVORITE FIGURES" inside a heading
- Renders a LoginForm
- Navigate figure "/figures"
- Receives an external collection of Figures
- Receives dispatch()
- Receives setToken()

### FigureList

- Receives a collection of Figures
- Renders as many FigureCard as Figures are in the collection

### FigureCard

- Receives a Figure
- Receives dispatch()
- Toggle isPurchased(nice to have)
- handleClick()(nice to have)
- Shows figure data:
  - Image: <img>
  - Franchise: <h1>
  - Purchased/pending: <span>
  - Price: <span>
  - Title: <p>
- Renders a Button with:
  - Icon/Image: delete
  - actionOnClick: handleClick
- Renders a Button with:
  - Icon/Image: modify
  - link?

### FigureDetailsPage

- Shows the title "FIGURE DETAILS" inside a heading
- Receives a Figure
- Receives dispatch()
- Receives removeFigure
- Navigate("/ModifyFigurePage")
- Toggle isPurchased(nice to have)
- handleClick()
- Shows figure data:
  - Image: <img>
  - Franchise: <h1>
  - Character: <span>
  - Purchased/pending: <span>
  - Price: <span>
  - Title: <p>
  - Manufacturer: <span>
  - Material: <span>
  - Size: <span>
  - Weight: <span>
- Renders a Button/ with:
  - text: "DELETE"
  - actionOnClick: handleClick
- Renders a Button/link? with:
  - text: "MODIFY"
  - actionOnClick: handleClick ?? or link

### AddFigurePage

- Shows the title "MODIFY YOUR FIGURE" inside a heading
- Receives dispatch()
- State:
  - isPurchased
- handleAddFigure(figureId)
- Renders ComponentForm(Add)

### ModifyFigurePage

- Shows the title "ADD YOUR FAVORITE FIGURE" inside a heading
- Receives dispatch()
- Render ComponentForm
- State:
  - isPurchased
- handleModifyFigure(figureData)
- Renders ComponentForm(Modify)

### NotFoundPage

- Shows the title "PAGE NOT FOUND" inside a heading
- Shows the title "404" inside a <span>
- Shows a image inside a <img>

### Button

- Receives a text
- Receives an action on click
- Shows a button with the received text
- Calls the received action when the button is clicked

### Loading

- Receives dispatch()
- Show a loading while awaiting recourse
- Show a loading while awaiting recourse

### Feedback

- Receives image and text
- Show a loading while awaiting recourse

### Pagination

- Receives dispatch

### FilterPurchased

- Receives dispatch

### ComponentForm(Add and Modify)

- Shows inputs figure data
- Shows introductions text
- State:
  - isPurchased
- handleSubmit()
- Receives dispatch()
- Receives introduction text
- Receives controlers text
- Receives button text(Nice to have????)
- Receives figureData(Only modify)(Nice to have????)
- Renders a Button component
  - text: "ADD / MODIFY"
  - onSubmit: handleSubmit
