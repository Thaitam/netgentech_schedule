-- B1: Xóa dữ liệu bảng Full_Contract
DELETE FROM Full_Contract WHERE ID=1;
DELETE FROM Full_Contract WHERE ID=2;

-- B2: Xóa dữ liệu bảng Property_Service
DELETE FROM Property_Service WHERE ID=1;
DELETE FROM Property_Service WHERE ID=2;
DELETE FROM Property_Service WHERE ID=3;
DELETE FROM Property_Service WHERE ID=4;
DELETE FROM Property_Service WHERE ID=5;
DELETE FROM Property_Service WHERE ID=6;
DELETE FROM Property_Service WHERE ID=7;
DELETE FROM Property_Service WHERE ID=8;
DELETE FROM Property_Service WHERE ID=9;
DELETE FROM Property_Service WHERE ID=10;
DELETE FROM Property_Service WHERE ID=11;
DELETE FROM Property_Service WHERE ID=12;
DELETE FROM Property_Service WHERE ID=13;
DELETE FROM Property_Service WHERE ID=14;
DELETE FROM Property_Service WHERE ID=15;
DELETE FROM Property_Service WHERE ID=16;

-- B4: Xóa dữ liệu bảng Property
DELETE FROM Installment_Contract WHERE ID=1;

-- B5: Xóa dữ liệu bảng Property
DELETE FROM Property WHERE ID=1;
DELETE FROM Property WHERE ID=2;
DELETE FROM Property WHERE ID=3;
DELETE FROM Property WHERE ID=11;

-- B6: Đổi kiểu dữ liệu của cột Full_Contract_Code thành 16
ALTER TABLE Full_Contract
ALTER COLUMN Full_Contract_Code varchar(16);

-- Trigger Property
create trigger ai_generate_code
on Property
for insert
as
begin
	declare @ID int, @NAMHT varchar(2), @MABDS varchar(10), @Max int
	set @ID = (select id from inserted)
	set @NAMHT = convert(varchar(2), right(year(GETDATE()),2))
	
	if exists (select 1 from Property where substring(Property_Code,4,2)=@NAMHT)
	begin
		set @Max = (select MAX(right(Property_Code,5)) from Property where substring(Property_Code,4,2)=@NAMHT) + 1
	end
	else
		set @Max = 1
	set @MABDS = 'PPC' + @NAMHT + FORMAT(@Max, '00000')
	update Property set Property_Code = @MABDS where id = @ID
end

-- Test trigger
insert into Property (Property_Name, Property_Type_ID, Description, District_ID, Address, Area, Bed_Room, Bath_Room, Price, Installment_Rate, Avatar, Album, Property_Status_ID) 
values('abc',2,'abcd',2,'dfdsf',null,null,null,null,null,null,null,1)
select * from Property

--Trigger FullContract
create trigger ai_generate_code_FC
on Full_Contract
for insert
as
begin
	declare @ID int, @NAMHT varchar(2), @MABDS varchar(16), @Max int, @THANGHT varchar(2), @NGAYHT varchar(2)
	set @ID = (select id from inserted)
	set @NAMHT = convert(varchar(2), right(year(GETDATE()),2))
	set @THANGHT = format(month(GETDATE()), '00')
	set @NGAYHT = format(day(GETDATE()), '00')

	if exists (select 1 from Full_Contract where substring(Full_Contract_Code,6,2)=@NAMHT and substring(Full_Contract_Code,8,2) = @THANGHT and substring(Full_Contract_Code,10,2)=@NGAYHT)
	begin
		set @Max = (select MAX(right(Full_Contract_Code,5)) from Full_Contract where substring(Full_Contract_Code,6,2)=@NAMHT and substring(Full_Contract_Code,8,2) = @THANGHT and substring(Full_Contract_Code,10,2)=@NGAYHT) + 1
	end
	else
		set @Max = 1
	set @MABDS = 'PPCFC' + @NAMHT + @THANGHT + @NGAYHT + FORMAT(@Max, '00000')
	update Full_Contract set Full_Contract_Code = @MABDS where id = @ID
end

-- Test trigger
insert into Full_Contract(Customer_Name,Year_Of_Birth,SSN,Customer_Address,Mobile,Property_ID,Date_Of_Contract,Price,Deposit,Remain,Status)
values('tan',2003,1,null,null,12,null,null,null,null,1)
select * from Full_Contract