-- Fix the bookings RLS policy to restrict viewing to booking owner only
DROP POLICY IF EXISTS "Anyone can view their own bookings by email" ON bookings;

-- Create proper policy that restricts viewing to the booking owner
CREATE POLICY "Users can view their own bookings"
ON bookings FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = bookings.email
  ) OR has_role(auth.uid(), 'admin')
);

-- Ensure other policies are secure
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

CREATE POLICY "Authenticated users can create bookings"
ON bookings FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = bookings.email
  )
);

-- Admin policies remain the same for full access
CREATE POLICY "Admins can update any booking"
ON bookings FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any booking"
ON bookings FOR DELETE
USING (has_role(auth.uid(), 'admin'));