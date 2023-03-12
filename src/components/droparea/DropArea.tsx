import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, pushDroppedItem } from '../../core/reducers/constructorSlice'
import { RootState } from '../../core/store/store'
import Item from '../item/Item'
import './droparea.sass'

export default function DropArea() {

  const dispatch = useDispatch()
  const {currentItem, currentItemPosition} = useSelector((state: RootState) => state.sort)
  const dropArea = useSelector((state: RootState) => state.sort.areas[1])

  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Check if this Item component in droparea
  const isInDropArea = () => {
    for (let i = 0; i < dropArea.items.length; i++) {
      if (currentItem?.id === dropArea.items[i].id) 
      return true
    }
    return false
  }

  const isEmpty = () => {
    return dropArea.items.length === 0
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dropArea.items.length === 0) dropAreaRef.current?.classList.add('active')
    
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dropAreaRef.current?.classList.remove('active')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropAreaRef.current?.classList.remove('active')
    if (isInDropArea()) dispatch(deleteItem(currentItem))
    dispatch(pushDroppedItem({currentItem, currentItemPosition}))
  }


  return(
    <div className="area">
      <div className={`droparea ${isEmpty() ? 'empty': ''}`} ref={dropAreaRef}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}>
          {
            dropArea.items.length > 0 
            ? dropArea.items?.map((item) => {
              return <Item id={item.id} name={item.name} area='droparea' key={item.id}/>
              })
            : 
            <svg width="127" height="84" viewBox="0 0 127 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.46191 36.8182H1.6068V47H3.13805V38.1307H7.93066V47H9.46191V36.8182ZM14.9829 47.1541C16.6483 47.1541 17.8266 46.3338 18.1647 45.0909L16.7577 44.8374C16.4893 45.5582 15.843 45.9261 14.9978 45.9261C13.7251 45.9261 12.8699 45.1009 12.8302 43.6293H18.2591V43.1023C18.2591 40.343 16.6086 39.2642 14.8785 39.2642C12.7506 39.2642 11.3486 40.8849 11.3486 43.2315C11.3486 45.603 12.7307 47.1541 14.9829 47.1541ZM12.8351 42.5156C12.8948 41.4318 13.6803 40.4922 14.8884 40.4922C16.0418 40.4922 16.7975 41.3473 16.8025 42.5156H12.8351ZM19.9085 49.8636H21.395V45.8118H21.4845C21.7529 46.299 22.2998 47.1491 23.6919 47.1491C25.5413 47.1491 26.8836 45.6676 26.8836 43.1967C26.8836 40.7209 25.5214 39.2642 23.6769 39.2642C22.26 39.2642 21.748 40.1293 21.4845 40.6016H21.3602V39.3636H19.9085V49.8636ZM21.3651 43.1818C21.3651 41.5859 22.0612 40.527 23.3588 40.527C24.7061 40.527 25.3822 41.6655 25.3822 43.1818C25.3822 44.7131 24.6862 45.8814 23.3588 45.8814C22.0811 45.8814 21.3651 44.7876 21.3651 43.1818ZM31.8403 47.1541C33.5058 47.1541 34.684 46.3338 35.0221 45.0909L33.6151 44.8374C33.3467 45.5582 32.7004 45.9261 31.8552 45.9261C30.5825 45.9261 29.7274 45.1009 29.6876 43.6293H35.1166V43.1023C35.1166 40.343 33.466 39.2642 31.7359 39.2642C29.608 39.2642 28.2061 40.8849 28.2061 43.2315C28.2061 45.603 29.5882 47.1541 31.8403 47.1541ZM29.6926 42.5156C29.7522 41.4318 30.5377 40.4922 31.7458 40.4922C32.8992 40.4922 33.6549 41.3473 33.6599 42.5156H29.6926ZM36.0922 40.6463H38.593V47H40.0447V40.6463H42.5354V39.3636H36.0922V40.6463ZM45.9745 47.169C47.2373 47.169 47.9482 46.5277 48.2316 45.956H48.2913V47H49.743V41.929C49.743 39.7067 47.993 39.2642 46.7799 39.2642C45.3978 39.2642 44.1251 39.821 43.6279 41.2131L45.0249 41.5312C45.2437 40.9893 45.8005 40.4673 46.7998 40.4673C47.7593 40.4673 48.2515 40.9695 48.2515 41.8345V41.8693C48.2515 42.4112 47.6947 42.4013 46.3225 42.5604C44.8758 42.7294 43.3943 43.1072 43.3943 44.8423C43.3943 46.3438 44.5228 47.169 45.9745 47.169ZM46.2977 45.9759C45.4575 45.9759 44.8509 45.598 44.8509 44.8622C44.8509 44.0668 45.5569 43.7834 46.417 43.669C46.8992 43.6044 48.0427 43.4751 48.2565 43.2614V44.2457C48.2565 45.1506 47.5356 45.9759 46.2977 45.9759ZM62.6654 45.7173H61.3728V39.3636H59.9161V45.7124H57.2762V39.3636H55.8195V45.7124H53.1796V39.3636H51.7229V47H61.0695V49.1875H62.5262L62.6654 45.7173ZM65.6894 44.9169V39.3636H64.2327V47H65.8485L69.1993 41.4418V47H70.656V39.3636H69.0551L65.6894 44.9169ZM71.7075 40.6463H74.2082V47H75.6599V40.6463H78.1507V39.3636H71.7075V40.6463ZM82.6586 47.1541C84.3241 47.1541 85.5024 46.3338 85.8405 45.0909L84.4335 44.8374C84.165 45.5582 83.5187 45.9261 82.6736 45.9261C81.4008 45.9261 80.5457 45.1009 80.5059 43.6293H85.9349V43.1023C85.9349 40.343 84.2844 39.2642 82.5542 39.2642C80.4264 39.2642 79.0244 40.8849 79.0244 43.2315C79.0244 45.603 80.4065 47.1541 82.6586 47.1541ZM80.5109 42.5156C80.5706 41.4318 81.3561 40.4922 82.5642 40.4922C83.7176 40.4922 84.4733 41.3473 84.4782 42.5156H80.5109ZM94.5059 47.1541C96.3106 47.1541 97.479 46.0703 97.643 44.5838H96.1963C96.0074 45.4091 95.366 45.8963 94.5159 45.8963C93.2581 45.8963 92.4477 44.8473 92.4477 43.1818C92.4477 41.5462 93.273 40.517 94.5159 40.517C95.4605 40.517 96.0372 41.1136 96.1963 41.8295H97.643C97.4839 40.2884 96.2261 39.2642 94.491 39.2642C92.3383 39.2642 90.9463 40.8849 90.9463 43.2166C90.9463 45.5185 92.2886 47.1541 94.5059 47.1541ZM100.212 39.3636H98.7256V47H100.212V43.8878H101.912C102.156 45.8615 103.483 47.1541 105.402 47.1541C107.54 47.1541 108.937 45.5582 108.937 43.2116C108.937 40.8452 107.54 39.2642 105.402 39.2642C103.459 39.2642 102.131 40.5767 101.907 42.5952H100.212V39.3636ZM105.402 45.8814C103.966 45.8814 103.324 44.6683 103.324 43.2116C103.324 41.75 103.966 40.527 105.402 40.527C106.844 40.527 107.481 41.755 107.481 43.2116C107.481 44.6634 106.844 45.8814 105.402 45.8814ZM109.944 49.2024H111.416V47H116.74V49.2024H118.192V45.7124H117.019V39.3636H111.828L111.59 42.2124C111.43 44.1364 111.197 45.1406 110.565 45.7124H109.944V49.2024ZM112.156 45.7124C112.663 45.0014 112.852 43.8182 113.002 42.2124L113.161 40.6364H115.567V45.7124H112.156ZM121.867 47.169C123.13 47.169 123.841 46.5277 124.124 45.956H124.184V47H125.636V41.929C125.636 39.7067 123.886 39.2642 122.672 39.2642C121.29 39.2642 120.018 39.821 119.521 41.2131L120.918 41.5312C121.136 40.9893 121.693 40.4673 122.692 40.4673C123.652 40.4673 124.144 40.9695 124.144 41.8345V41.8693C124.144 42.4112 123.587 42.4013 122.215 42.5604C120.768 42.7294 119.287 43.1072 119.287 44.8423C119.287 46.3438 120.415 47.169 121.867 47.169ZM122.19 45.9759C121.35 45.9759 120.744 45.598 120.744 44.8622C120.744 44.0668 121.449 43.7834 122.31 43.669C122.792 43.6044 123.935 43.4751 124.149 43.2614V44.2457C124.149 45.1506 123.428 45.9759 122.19 45.9759Z" fill="#5D5FEF"/><path d="M17.8311 66H18.1721C19.6209 66 20.0385 64.875 20.1323 62.7273L20.2346 60.392H22.638V66H23.6436V59.4545H19.28L19.1607 62.3523C19.0755 64.5511 18.8539 65.0625 18.0698 65.0625H17.8311V66ZM26.0172 59.4545H25.0115V66H26.0172V63.2557H27.6962C27.8752 65.0071 29.013 66.1364 30.6365 66.1364C32.4093 66.1364 33.6025 64.7898 33.6025 62.7614C33.6025 60.7159 32.4093 59.3693 30.6365 59.3693C28.9959 59.3693 27.8496 60.5241 27.6919 62.3182H26.0172V59.4545ZM30.6365 65.233C29.29 65.233 28.6763 64.0739 28.6763 62.7614C28.6763 61.4489 29.29 60.2727 30.6365 60.2727C31.9831 60.2727 32.5968 61.4489 32.5968 62.7614C32.5968 64.0739 31.9831 65.233 30.6365 65.233ZM40.0968 57C39.7772 57.2685 39.2999 57.2685 38.6309 57.2642C38.4135 57.2642 38.1749 57.2642 37.915 57.2727C35.9206 57.3239 34.932 58.8409 34.932 61.7557V62.4545C34.932 64.875 36.1081 66.1364 37.8638 66.1364C39.6152 66.1364 40.7786 64.8665 40.7786 62.8125C40.7786 60.75 39.5982 59.6591 38.0684 59.6591C37.1692 59.6591 36.3297 60.0341 35.8865 60.8523H35.8013C35.9377 59.1648 36.5684 58.2614 37.932 58.2102C39.1422 58.1591 40.0115 58.1932 40.6081 57.6136L40.0968 57ZM37.8638 65.233C36.6706 65.233 35.9377 64.2784 35.9377 62.8125C35.959 61.3807 36.6792 60.5625 37.8468 60.5625C39.0442 60.5625 39.7729 61.3807 39.7729 62.8125C39.7729 64.2869 39.0485 65.233 37.8638 65.233ZM44.976 66.1364C46.7488 66.1364 47.9419 64.7898 47.9419 62.7614C47.9419 60.7159 46.7488 59.3693 44.976 59.3693C43.2033 59.3693 42.0101 60.7159 42.0101 62.7614C42.0101 64.7898 43.2033 66.1364 44.976 66.1364ZM44.976 65.233C43.6294 65.233 43.0158 64.0739 43.0158 62.7614C43.0158 61.4489 43.6294 60.2727 44.976 60.2727C46.3226 60.2727 46.9363 61.4489 46.9363 62.7614C46.9363 64.0739 46.3226 65.233 44.976 65.233ZM50.4828 64.517V59.4545H49.4771V66H50.6532L53.7896 60.9375V66H54.7953V59.4545H53.6362L50.4828 64.517ZM52.9714 57.2727C52.9714 57.7159 52.7328 58.108 52.1362 58.108C51.5396 58.108 51.318 57.7159 51.318 57.2727H50.3805C50.3805 58.1932 51.0623 58.8409 52.1362 58.8409C53.2271 58.8409 53.9089 58.1932 53.9089 57.2727H52.9714ZM62.177 60.3068C63.1998 60.3153 63.8091 61.2528 63.9412 62.233H61.5123V63.1705H63.9498C63.8432 64.1676 63.2125 65.1733 62.177 65.1818C61.41 65.1733 60.6941 64.5085 60.6941 63.767H59.7054C59.7054 65.071 60.7452 66.1193 62.177 66.1193C63.9668 66.1193 64.9725 64.598 64.9725 62.8636V62.625C64.9725 60.8906 63.9668 59.3693 62.177 59.3693C60.8986 59.3693 59.7054 60.4176 59.7054 61.5511H60.6941C60.6941 60.8736 61.4952 60.3153 62.177 60.3068ZM65.9249 66H66.2658C67.7147 66 68.1323 64.875 68.226 62.7273L68.3283 60.392H70.7317V66H71.7374V59.4545H67.3738L67.2544 62.3523C67.1692 64.5511 66.9476 65.0625 66.1635 65.0625H65.9249V66ZM76.3269 66.1364C77.6564 66.1364 78.628 65.4716 78.9348 64.483L77.9632 64.2102C77.7076 64.892 77.1152 65.233 76.3269 65.233C75.1465 65.233 74.3326 64.4702 74.2857 63.0682H79.0371V62.642C79.0371 60.2045 77.5882 59.3693 76.2246 59.3693C74.4519 59.3693 73.2757 60.767 73.2757 62.7784C73.2757 64.7898 74.4348 66.1364 76.3269 66.1364ZM74.2857 62.1989C74.3539 61.1804 75.074 60.2727 76.2246 60.2727C77.3155 60.2727 78.0144 61.0909 78.0144 62.1989H74.2857ZM84.1465 64.6364L81.8965 59.4545H80.5669V66H81.5726V60.8991L83.7374 66H84.5556L86.7203 60.9929V66H87.726V59.4545H86.4306L84.1465 64.6364ZM92.3113 66.1364C93.6408 66.1364 94.6124 65.4716 94.9192 64.483L93.9476 64.2102C93.6919 64.892 93.0996 65.233 92.3113 65.233C91.1309 65.233 90.3169 64.4702 90.2701 63.0682H95.0215V62.642C95.0215 60.2045 93.5726 59.3693 92.209 59.3693C90.4363 59.3693 89.2601 60.767 89.2601 62.7784C89.2601 64.7898 90.4192 66.1364 92.3113 66.1364ZM90.2701 62.1989C90.3382 61.1804 91.0584 60.2727 92.209 60.2727C93.2999 60.2727 93.9988 61.0909 93.9988 62.1989H90.2701ZM97.557 59.4545H96.5513V66H97.557V63.2045H100.693V66H101.699V59.4545H100.693V62.267H97.557V59.4545ZM102.645 60.392H104.81V66H105.816V60.392H107.963V59.4545H102.645V60.392ZM16.4691 79.517V74.4545H15.4634V81H16.6396L19.7759 75.9375V81H20.7816V74.4545H19.6225L16.4691 79.517ZM22.2145 79.3295C22.2486 80.4034 23.2756 81.1364 24.669 81.1364C26.1009 81.1364 27.1406 80.3693 27.1406 79.1761C27.1406 78.358 26.6506 77.6932 25.9134 77.642V77.5739C26.5355 77.3821 27.0043 76.9304 27.0043 76.1932C27.0043 75.1577 26.1179 74.3693 24.7372 74.3693C23.3736 74.3693 22.402 75.1193 22.3679 76.1761H23.4247C23.4545 75.6349 24.0213 75.2557 24.7884 75.2557C25.5511 75.2557 25.9815 75.6435 25.9815 76.2273C25.9815 76.7727 25.6065 77.1818 24.8054 77.1818H23.6804V78.0852H24.8054C25.6065 78.0852 26.1179 78.5241 26.1179 79.1761C26.1179 79.9219 25.4574 80.233 24.652 80.233C23.8636 80.233 23.3352 79.9219 23.2884 79.3295H22.2145ZM31.3487 81H31.6896C33.1385 81 33.5561 79.875 33.6499 77.7273L33.7521 75.392H36.1555V81H37.1612V74.4545H32.7976L32.6783 77.3523C32.593 79.5511 32.3714 80.0625 31.5874 80.0625H31.3487V81ZM41.7507 81.1364C43.0803 81.1364 44.0518 80.4716 44.3587 79.483L43.3871 79.2102C43.1314 79.892 42.5391 80.233 41.7507 80.233C40.5703 80.233 39.7564 79.4702 39.7095 78.0682H44.4609V77.642C44.4609 75.2045 43.0121 74.3693 41.6484 74.3693C39.8757 74.3693 38.6996 75.767 38.6996 77.7784C38.6996 79.7898 39.8587 81.1364 41.7507 81.1364ZM39.7095 77.1989C39.7777 76.1804 40.4979 75.2727 41.6484 75.2727C42.7393 75.2727 43.4382 76.0909 43.4382 77.1989H39.7095ZM45.9908 81H49.076C50.4055 81 51.2067 80.25 51.2067 79.2443C51.2067 78.2173 50.4268 77.6634 49.7067 77.5568C50.4439 77.4034 50.968 76.9901 50.968 76.1932C50.968 75.1491 50.0732 74.4545 48.6669 74.4545H45.9908V81ZM46.9453 80.0795V78.0682H49.076C49.7663 78.0682 50.1839 78.4815 50.1839 79.1591C50.1839 79.7301 49.7663 80.0795 49.076 80.0795H46.9453ZM46.9453 77.1989V75.375H48.6669C49.4723 75.375 49.9624 75.7116 49.9624 76.2614C49.9624 76.8452 49.4723 77.1989 48.6669 77.1989H46.9453ZM55.3881 81.1364C57.1609 81.1364 58.354 79.7898 58.354 77.7614C58.354 75.7159 57.1609 74.3693 55.3881 74.3693C53.6154 74.3693 52.4222 75.7159 52.4222 77.7614C52.4222 79.7898 53.6154 81.1364 55.3881 81.1364ZM55.3881 80.233C54.0415 80.233 53.4279 79.0739 53.4279 77.7614C53.4279 76.4489 54.0415 75.2727 55.3881 75.2727C56.7347 75.2727 57.3484 76.4489 57.3484 77.7614C57.3484 79.0739 56.7347 80.233 55.3881 80.233ZM60.8949 79.517V74.4545H59.8892V81H61.0653L64.2017 75.9375V81H65.2074V74.4545H64.0483L60.8949 79.517ZM63.3835 72.2727C63.3835 72.7159 63.1449 73.108 62.5483 73.108C61.9517 73.108 61.7301 72.7159 61.7301 72.2727H60.7926C60.7926 73.1932 61.4744 73.8409 62.5483 73.8409C63.6392 73.8409 64.321 73.1932 64.321 72.2727H63.3835ZM70.4244 81H71.43V75.392H74.5664V81H75.5721V74.4545H70.4244V81ZM79.3349 81.1534C80.4769 81.1534 81.0735 80.5398 81.2781 80.1136H81.3292V81H82.3349V76.6875C82.3349 74.608 80.7496 74.3693 79.9144 74.3693C78.9258 74.3693 77.8008 74.7102 77.2894 75.9034L78.244 76.2443C78.4656 75.767 78.9897 75.2557 79.9485 75.2557C80.8732 75.2557 81.3292 75.7457 81.3292 76.5852V76.6193C81.3292 77.1051 80.8349 77.0625 79.6417 77.2159C78.4272 77.3736 77.1019 77.642 77.1019 79.142C77.1019 80.4205 78.0906 81.1534 79.3349 81.1534ZM79.4883 80.25C78.6871 80.25 78.1076 79.892 78.1076 79.1932C78.1076 78.4261 78.8065 78.1875 79.5906 78.0852C80.0167 78.0341 81.1587 77.9148 81.3292 77.7102V78.6307C81.3292 79.4489 80.6815 80.25 79.4883 80.25ZM85.1761 74.4545H84.1705V81H85.1761V78.2045H88.3125V81H89.3182V74.4545H88.3125V77.267H85.1761V74.4545ZM93.8991 81.1364C95.2287 81.1364 96.2003 80.4716 96.5071 79.483L95.5355 79.2102C95.2798 79.892 94.6875 80.233 93.8991 80.233C92.7188 80.233 91.9048 79.4702 91.858 78.0682H96.6094V77.642C96.6094 75.2045 95.1605 74.3693 93.7969 74.3693C92.0241 74.3693 90.848 75.767 90.848 77.7784C90.848 79.7898 92.0071 81.1364 93.8991 81.1364ZM91.858 77.1989C91.9261 76.1804 92.6463 75.2727 93.7969 75.2727C94.8878 75.2727 95.5866 76.0909 95.5866 77.1989H91.858ZM97.5597 81H97.9006C99.3494 81 99.767 79.875 99.8608 77.7273L99.9631 75.392H102.366V81H103.372V74.4545H99.0085L98.8892 77.3523C98.804 79.5511 98.5824 80.0625 97.7983 80.0625H97.5597V81ZM106.223 79.517V74.4545H105.217V81H106.393L109.53 75.9375V81H110.536V74.4545H109.376L106.223 79.517Z" fill="#6B7280"/><path d="M70.7778 1V5.44444" stroke="black" strokeWidth="2" strokeLinecap="round"/><path d="M73 3.22222L68.5556 3.22222" stroke="black" strokeWidth="2" strokeLinecap="round"/><path d="M64.3889 3.22222H57C54.7909 3.22222 53 5.01309 53 7.22223V16.2778M70.7778 9.61111V17C70.7778 19.2091 68.9869 21 66.7778 21H57C54.7909 21 53 19.2091 53 17V16.2778M53 16.2778L56.8382 12.4395C58.4003 10.8774 60.933 10.8774 62.4951 12.4395C63.8961 13.8406 65.5664 15.5108 66.8889 16.8333" stroke="black" strokeWidth="2" strokeLinecap="round"/><path d="M70.7778 14.6111L70.2729 14.1062C68.7108 12.5441 66.1781 12.5441 64.616 14.1062L64.3889 14.3333" stroke="black" strokeWidth="2" strokeLinecap="round"/><circle cx="64.1111" cy="7.66667" r="0.555556" fill="black"/>
            </svg>
              
          }
      </div>
    </div>
  )
}